import cloneDeep from 'lodash/cloneDeep';
import forIn from 'lodash/forIn';

/*
 * util helper methods
 */
export default {
  /**
   * 计时器
   */
  sendCaptcha(timer) {
    if (timer.seconds > 0) {
      timer.seconds -= 1;
      timer.text = `剩余: ${timer.seconds} 秒`;
      clearTimeout(timer.secondsTimer);
      timer.secondsTimer = setTimeout(() => {
        this.sendCaptcha(timer);
      }, 1000);
    } else {
      clearTimeout(timer.secondsTimer);
      timer.secondsTimer = null;
      timer.text = '获取验证码';
    }
    return timer;
  },
  /**
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
   * formatTime(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
   * 参照：http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
   */
  formatTime(time, fmt) {
    if (!time || !fmt) {
      return '';
    }
    if (typeof time === 'string') {
      time = time.replace(/-/g, '/');
      time = new Date(time);
    }
    const o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (`${time.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach(k => {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    });
    return fmt;
  },

  /**
   * 年月日使用 . 拼接：2017.5.9
   * @param time 时间
   * @param join 拼接符号，默认为 .
   */
  formatDate(time = null, join) {
    join = join || '.';
    const date = time === null ? new Date() : new Date(time);
    const timeArr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return timeArr.join(join);
  },
  go (url, $router) {
    if (/^javas/.test(url) || !url) return;
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url));
    if (useRouter) {
      $router.push(url);
    } else {
      window.location.href = url;
    }
  },
  getScrollTop() {
    let scrollTop = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  },
  /**
   * 针对养修预约模块中出现大量形如 2018-12-02 09:00 要展示成 2018-12-02 09:00 -- 09：30
   * @param timeStr 2018-12-02 09:00 || 09:00
   * @returns {string} 2018-12-02 09:00 -- 09：30 || 09:00 -- 09：30
   */
  addHalfHour(timeStr) {
    if (!timeStr || !timeStr.indexOf(':')) {
      return timeStr;
    }
    const arr = timeStr.split(':');
    const toTen = (num) => (num < 10 ? `0${num}` : `${num}`);
    const hour = arr[0].length === 2 ? arr[0] : arr[0].substr(11);
    const halfHourLater = +arr[1] >= 30 ? `${toTen(+hour + 1)}:00` : `${hour}:30`;
    return `${timeStr} - ${halfHourLater.length <= 5 ? halfHourLater : halfHourLater.substr(11)}`;
  },
  /**
   * 打开一个新的标签页
   * @param {string} protocol 协议：例如http:、https:、ftp:
   * @param {string} host 域名：例如 www.baidu.com
   * @param {string} url
   * 示例：在新的标签页打开 'https://www.baidu.com/more'
   * openNewTab('https', 'www.baidu.com', 'more')
   */
  openNewTab(protocol, host, url) {
    const openHref = `${protocol}//${host}/${url}`;
    window.open(openHref);
    return openHref;
  },
  /**
   * 清理对象中的无效字符串
   * @param {object} obj 需要清理的无效字段的obj
   * ""(空字符串)、数字 0 将判断为有效
   * 以下字段值会判断为无效：null、NaN、undefined。
   */
  clearNullProp(obj) {
    const _this = this;
    // 复制一份避免影响原数据
    const _obj = cloneDeep(obj);
    forIn(_obj, (val, key) => {
      if (!val && val !== 0 && val !== false) {
        delete _obj[key];
      }

      if (_obj[key] instanceof Object) {
        _obj[key] = _this.clearNullProp(_obj[key]);
        // 经过上面递归处理完，可能会出现 follow: {} 的情况，所以在回溯时，将 follow 也一并干掉
        if (!Object.keys(_obj[key]).length) {
          delete _obj[key];
        }
      }
    });
    return _obj;
  },
  /* 数组遍历定义选项范围
  ** @param sub-len 数组长度参数
  */
  arrayList(sub, len) {
    const arraylist = [];
    for (sub; sub <= len; sub++) {
      arraylist.push(sub);
    }
    return arraylist;
  },
  /**
   * 添加一年
   * @param {String} value 要加一年的时间格式为'yyyy-MM-dd'
   */
  addOneYear(value) {
    const oneYear = new Date(value);
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    oneYear.setDate(oneYear.getDate() - 1);
    return oneYear;
  },
  /**
   * 禁止页面滚动，常用于弹窗组件
   */
  disableScroll() {
    document.documentElement.style.overflowY = 'hidden';
    // 页面有滚动条时，防止页面跳动
    if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
      document.documentElement.style.paddingRight = '16px';
    }
  },
  enableScroll() {
    document.documentElement.style.overflowY = 'auto';
    if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
      document.documentElement.style.paddingRight = '0';
    }
  },
  downloadImage(src, name) {
    const image = new Image();
    // 解决跨域 canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const event = new MouseEvent('click');
      a.download = name || '图片';
      a.href = url;
      a.dispatchEvent(event);
    };
    image.src = src;
  },
  getQueryVariable(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]); return null;
  },
  /**
   * 分转万元
   * @param val
  */
  fenToWan (val) {
    return val ? `${(val / 1000000).toFixed(2)}万元` : '--';
  },
};



