import { ChartsStatus, ChartsPageParamsBO } from '@/models/bo/ChartsBO';
import moment from 'moment';

const FnUtils = {
  getParams(url: string) {
    // tslint:disable-next-line: one-variable-per-declaration
    let vars = {},
      hash,
      hashes,
      i;
    url = url || window.location.href;

    if (url.indexOf('?') === -1) {
      return vars;
    }

    hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (i = 0; i < hashes.length; i++) {
      if (!hashes[i] || hashes[i].indexOf('=') === -1) {
        continue;
      }
      hash = hashes[i].split('=');
      if (hash[1]) {
        // @ts-ignore
        vars[hash[0]] = hash[1].indexOf('#') !== -1 ? hash[1].slice(0, hash[1].indexOf('#')) : hash[1];
      }
    }
    return vars;
  },
  getParam(name: string, url: string) {
    // @ts-ignore
    return name ? this.getParams(url)[name] : this.getParams(url);
  },
  getCurrentParam(name: string) {
    return this.getParam(name, location.href);
  },
  /**
   * @description 获取折线图链接
   * @param params
   */
  getChartsLink(params: ChartsPageParamsBO) {
    const { dateType, startTime, endTime, type, tagNameList, doubleAxis, name, aliasType } = params;
    const interfaceType = params.interfaceType ? params.interfaceType : ChartsStatus.common;
    return `/charts?name=${name}&dateType=${dateType}&startTime=${startTime}&endTime=${endTime}&type=${type}&tagName1=${tagNameList[0]}&tagName2=${tagNameList[1]}&interfaceType=${interfaceType}&aliasType=${aliasType}&doubleAxis=${doubleAxis}`;
  },
  /**
   * @description 获取tagNameList
   */
  getTagNameList() {
    const { tagName1, tagName2 } = this.getParams(location.hash) as any;
    return [tagName1, tagName2].filter(item => item !== 'undefined');
  },

  /**
   * @description 当前客户端是否是轻推客户端
   * @returns isMobile
   */
  clientIsMobile() {
    let isMobile = false;
    (window as any).qt.getClientInfo({
      success(res: any) {
      },
      fail() {
        isMobile = false;
      },
    });
    return isMobile;
  },
  /**
   * @description 当前时间是否超过接口刷新时间（晚上8点）
   */
  checkCacheExpried() {
    return +new Date().getHours() < 20;
  },
  /**
   * @description 获取当前时间距离0点的时间戳
   */
  getCurrentTimes() {
    const hour = moment().get('hour');
    const minute = moment().get('minute');
    const second = moment().get('second');
    return (hour * 3600 + minute * 60 + second) * 1e3;
  },
  getDisplayName(component: any) {
    return component.displayName || component.name || 'Component';
  },
  scrollToTop() {
    if (this.clientIsMobile()) {
      window.scrollTo(0, 0);
    } else {
      const appRoot = document.getElementById('root') as HTMLElement;
      appRoot.scrollTo(0, 0);
    }
  },
  getParentNodeByClass(node: HTMLElement, attr: string): any {
    if (node.classList.contains(attr)) {
      return node;
    }
    const parentNode = node.parentNode as HTMLElement;
    if (parentNode && parentNode.classList) {
      if (parentNode.classList.contains(attr)) {
        return parentNode;
      }
    } else {
      return node;
    }

    return this.getParentNodeByClass(parentNode, attr);
  },
};

export default FnUtils;
