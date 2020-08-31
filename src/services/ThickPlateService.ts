import {Method, sendRequest} from '@/utils/RequestUtil';
import {
  GET_BAOSTEEL_SERVICE
} from '@/constants/URLLink';

// 水质监测外面列表的数据
export const getWaterQualityMonitoring = (param: any) => {
  const data = new URLSearchParams();
  data.append('parameter_postdata', JSON.stringify({
    attr: {
      parameter_compressdata: 'true',
      parameter_deviceid: '867065022642248',
      requestType: 'get',
      datatype: 'json/json',
      methodName: '',
      projectName: 'cisdiproject', // watertest    cisdiproject
      serviceName: `/mobile/lastWaterByNameAndTime?appName=${param.appName}&time=${param.time}`,
      parameter_encryptdata: 'false',
    },
  }));
  data.append('datatype', 'json/json');

  return sendRequest({
    method: Method.POST,
    url: GET_BAOSTEEL_SERVICE,
    data: data,
  }).then(res =>res.data.data);
};
