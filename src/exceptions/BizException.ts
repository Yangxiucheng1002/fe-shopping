import { getErrorCodeAndLocaleKey } from './ErrorCodeHandler';

/**
 * 系统异常
 *
 * @export
 * @class BizException
 * @extends {Error}
 */
export default class BizException extends Error {
  public code: any;
  public message: string;
  public localeKey: string;
  public data: any;

  /**
   *
   * @param message 含错误码的message，如1000，[1000]error message
   * @param errorData
   */
  constructor(msg?: string, errorData?: any) {
    const message = msg ? msg + '' : '';
    super(message);
    const errorMessage = getErrorCodeAndLocaleKey(message || '', errorData);
    this.code = errorMessage.code;
    this.localeKey = errorMessage.localeKey;
    this.data = errorMessage.data;
    this.message = message || '';
    // if (typeof Error.captureStackTrace === 'function') {
    //   Error.captureStackTrace(this, this.constructor);
    // } else {
    //   this.stack = new Error(message).stack;
    // }
      this.stack = new Error(message).stack;
  }
}
