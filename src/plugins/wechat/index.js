/**
 * a plugin for wx jssdk
 * https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html
 */
import Vue from 'vue';

export default class Wechat {
  static install() {}
  // 校验微信接口

  constructor(options) {
    this.wx = window.wx;
    // this.wx = wx;

    // merge 方法
    Object.assign(this, options);
    if (this.beforeCreate) {
      this.beforeCreate();
    }

    // 构造函数执行完之后的hook
    if (this.created) {
      this.created();
    }
  }
}

/**
 * vue 组件安装方法
 * @return {[type]}
 */
function install() {
  if (install.installed) return;
  install.installed = true;
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.wechat) {
        this.$wechat = options.wechat;
      } else if (options.parent && options.parent.$wechat) {
        this.$wechat = options.parent.$wechat;
      }
    },
  });
}
Wechat.install = install;
Wechat.version = '__VERSION__';
