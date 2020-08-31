import BizException from './BizException';
import ExceptionInfo from './ExceptionInfo';

function toJSON(bizException: BizException): ExceptionInfo {
  return {
    errorCode: bizException.code,
    errorLocaleKey: bizException.localeKey,
    errorMessage: bizException.message,
    errorData: bizException.data,
  };
}

/**
 *
 * 异常错误转换
 * @export
 * @param {*} error
 * @returns
 */
export default function transformError2ExceptionInfo(error: any): ExceptionInfo {
  let bizException;
  if (error instanceof BizException) {
    return toJSON(error);
  }
  if (error instanceof Error) {
    bizException = new BizException(error.message, (error as any).data);
    return toJSON(bizException);
  }
  // 默认错误处理
  bizException = new BizException(error, error.data);
  return toJSON(bizException);
}
