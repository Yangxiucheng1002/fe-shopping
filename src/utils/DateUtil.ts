import _ from 'lodash';

// 本地时间减服务器的时间差(ms)
let localToServerTimeDiff = 0;

(Date.prototype as any).format = function(format: any) {
  const o: any = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };

  let result = format;
  if (/(y+)/.test(format)) {
    result = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(result)) {
      result = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  return result;
};

// 获取最近多少天时间
export const timeForMat = (count: number) => {
// 拼接时间
  let time1 = new Date()
  time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
  let Y1 = time1.getFullYear()
  let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
  let timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
  let time2 = new Date()
  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
  let Y2 = time2.getFullYear()
  let M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  let D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
  return Y2 + '-' + M2 + '-' + D2 + ' 00:00:00';
}

/**
 * 校正服务器时间
 * (仅在底层Request调用)
 */
export function correctionServerTime(serverTimeStr: string) {
  const localTimeStamp = Date.now();
  const serverTimestamp = new Date(serverTimeStr).getTime();
  if (serverTimestamp > 0) {
    // 获取到的服务器时间是有一个有效值
    localToServerTimeDiff = localTimeStamp - serverTimestamp;
  }
}

/**
 * 获取服务器时间戳
 */
export function getServerTimestamp(): number {
  const localTimeStamp = Date.now();
  return localTimeStamp - localToServerTimeDiff;
}

/**
 * 获取服务器时间对象
 */
export function getServerDate(): Date {
  return new Date(getServerTimestamp());
}

/**
 * 根据时间戳获取日期对象，不传参数获取当前时间的日期对象
 *
 * @export
 * @param {(string | number | null | undefined)} stamp
 * @returns {Date}
 */
export function getDateFromTimestamp(stamp: string | number | null | undefined): Date {
  const timestamp = _.isNil(stamp) ? getServerTimestamp() : stamp;
  if (typeof timestamp === 'number') {
    return new Date(timestamp);
  }
  return new Date(parseInt(<string>timestamp, 10));
}

export function format(date: string | number | Date| any, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (typeof date === 'number') {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  } else if (typeof date === 'string') {
    // eslint-disable-next-line no-param-reassign
    date = new Date(Number(date));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  // eslint-disable-next-line no-param-reassign
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length)) }
  for (const k in o) {
    // eslint-disable-next-line no-param-reassign
    if (new RegExp('(' + k + ')').test(fmt)) {
      // @ts-ignore
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr((String(o[k])).length))) }
  }
  return fmt;
}
