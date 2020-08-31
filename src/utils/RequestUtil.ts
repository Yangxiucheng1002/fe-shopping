/**
 * 请求封装工具类
 */
import axios, { AxiosRequestConfig, Canceler, AxiosResponse } from 'axios';
import qs from 'qs';
import BizException from '../exceptions/BizException';
import { ErrorCode } from '@/exceptions/ErrorCode';
import { uuid } from './UUID';
  // import { getErrorCode } from '@/exceptions/ErrorCodeHandler';
  // import { TokenBO } from '@/models/bo/TokenBO';
// import { updateAccountToken, getAccountToken } from '@/services/TokenService';
import { BASE_URL } from '@/constants/URLLink';
const CancelToken = axios.CancelToken;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
export enum Method {
  GET = 'get',
  POST = 'post',
}

interface RequestHeader {
  [key: string]: string | null;
}

/**
 * 请求参数
 */
export interface RequestParam {
  url: string;
  method: Method;
  data?: any;
  timeout?: number;
  retry?: number;
  headers?: RequestHeader;
  cancelExecutor?: (canceler: Canceler) => void;
  responseType?: string; // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
}

interface CustomRequestConfig extends AxiosRequestConfig {
  url: string;
  requestId: string; // 每次请求的唯一标识ID
  requestFilterKey: string; // 用于过滤请求的key
  retry: number; // 请求重试次数
  oriParam: any; // 请求的原始数据
}

interface FilterUrl {
  url: string;
  keyGenerator: (config: CustomRequestConfig) => string;
}

// 需要过滤请求的url配置
// 通过keyGenerator生成请求标识，标识一致，则认为请求一致
const filterUrlConfig: { [url: string]: FilterUrl } = {};

function getRequestKey(config: CustomRequestConfig): string {
  const item = filterUrlConfig[config.url];
  if (item) {
    return item.keyGenerator(config);
  }
  return config.requestId;
}

// 正在pending的请求
const pendingRequest: any = {};

function pushPendingRequest(config: CustomRequestConfig, data: any) {
  const key = config.requestFilterKey;
  if (pendingRequest[key]) {
    pendingRequest[key].push(data);
  } else {
    pendingRequest[key] = [];
    pendingRequest[key].push(data);
  }
}

function isRequestPending(config: CustomRequestConfig): boolean {
  const requestList = pendingRequest[config.requestFilterKey] || [];
  return requestList.length > 1;
}

function execRequestResolve(requestFilterKey: string, data: any): void {
  const requestList = pendingRequest[requestFilterKey];
  for (const request of requestList) {
    request.resolve(data);
  }
  delete pendingRequest[requestFilterKey];
}

function execRequestReject(requestFilterKey: string, error: Error): void {
  const requestList = pendingRequest[requestFilterKey];
  for (const request of requestList) {
    request.reject(error);
  }
  delete pendingRequest[requestFilterKey];
}

// 参数序列化
axios.defaults.paramsSerializer = params => qs.stringify(params, { indices: false });

function handleResponse(response: AxiosResponse) {
  const originalRequest = response.config as CustomRequestConfig;
  const data = response.data || {};

  if (data.code && data.code !== 0 && data.code !== 200) {
    console.warn('[request failed]', originalRequest.url, data.code, data.message);
    return Promise.reject(new BizException(`[${data.code}]${data.message || ''}`, data.data));
  }

  // 正常响应接口
  return Promise.resolve(data);
}

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return handleResponse(response);
  },
  error => {
    const resp = error.response;
    let errorMsg = ErrorCode.REQUEST_FAILED;
    if (resp) {
      const status = resp.status;
      if (status === 404) {
        errorMsg = ErrorCode.NOT_FOUND;
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMsg = ErrorCode.TIME_OUT;
    }
    // 请求出错，如网络连接不通
    // 超时，404等，直接抛回异常
    return Promise.reject(new BizException(errorMsg));
  }
);

/**
 *
 * @param {RequestParam} param
 * @param param.teamId
 * @param param.timeout default: 10e3
 */
export function sendRequest(param: RequestParam) {
  return new Promise<any>((resolve, reject) => {
    const config: CustomRequestConfig = {
      baseURL: BASE_URL,
      url: param.url,
      method: param.method,
      cancelToken: new CancelToken(canceler => {
        if (typeof param.cancelExecutor === 'function') {
          param.cancelExecutor(canceler);
        }
      }),
      oriParam: param.data,
      requestId: uuid(),
      requestFilterKey: '',
      retry: typeof param.retry === 'number' ? param.retry : 2,
      timeout: typeof param.timeout === 'number' ? param.timeout : 10e3,
    };
    if (config.method === Method.POST) {
      config.data = param.data
    } else {
      config.params = param.data;
    }

    config.requestFilterKey = getRequestKey(config);
    // 存入pending列表中
    pushPendingRequest(config, {
      resolve,
      reject,
      requestId: config.requestId,
    });
    if (!isRequestPending(config)) {
      // 没有正在发送的请求
      // 发送该请求，请求成功回调会在response的拦截器中执行
      axios(config)
        .then(response => {
          execRequestResolve(config.requestFilterKey, response);
        })
        .catch(error => {
          execRequestReject(config.requestFilterKey, error);
        });
    }
  });
}
