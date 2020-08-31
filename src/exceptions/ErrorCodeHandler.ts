import {ErrorCode, errorCodeMessage} from './ErrorCode';

function getErrorLocaleKey(errorCode: string) {
    return errorCodeMessage[errorCode] || errorCodeMessage[ErrorCode.REQUEST_FAILED];
}

export function getErrorCode(codeMsg: string | number = ''): ErrorCode {
    let errorMsg = codeMsg + '';
    let start = errorMsg.indexOf('[');
    // 兼容处理，errorMsg可能直接为code，可能在[]中
    if (start <= -1) {
        errorMsg = `[${errorMsg}]`;
        start = 0;
    }
    const end = errorMsg.indexOf(']');
    return errorMsg.substring(start + 1, end) as ErrorCode;
}

/**
 *
 * 错误解析
 * @export
 * @param {string} errorMsg 错误信息
 * @param {*} data 错误返回的数据
 * @returns
 */
export function getErrorCodeAndLocaleKey(errorMsg: string, data: any) {
    const errorCode = getErrorCode(errorMsg) || ErrorCode.SYSTEM_BUSY;
    const errorLocaleKey = getErrorLocaleKey(errorCode);
    return {
        data,
        code: errorCode,
        localeKey: errorLocaleKey,
    };
}
