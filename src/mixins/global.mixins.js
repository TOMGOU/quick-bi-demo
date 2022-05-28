/**
 * 全局混合
 */
import Vue from 'vue';
import util from '@/common/util';

Vue.mixin({
  methods: {
    // 校验是否有对应的权限
    hasAuth(auth) {
      const authList = this.$store.state.authList || [];
      return authList && authList.some(val => val === auth);
    },
    // 异步获取权限
    checkAuth() {
      return this.$store.dispatch('UPDATE_USERINFO', {
        message: this.$message,
      });
    },
    showToast(text) {
      this.$store.dispatch('UPDATE_TOAST', {
        show: true,
        text,
      });
    },
    switchLoading(loading) {
      this.$store.dispatch('UPDATE_LOADING', {
        status: loading.status || false,
        text: loading.text || '',
        time: loading.time || 0,
      });
    },
    encodeURIComponent(param) {
      // 适配encodeURIComponent方法，将undefined更改为空字符串
      const paramStr = '';
      if (param === undefined) {
        return paramStr;
      }
      return window.encodeURIComponent(param);
    },
    decodeURIComponent(param) {
      // 适配decodeURIComponent方法，将undefined更改为空字符串
      const paramStr = '';
      if (param === undefined) {
        return paramStr;
      }
      return window.decodeURIComponent(param);
    },
    openNewTab(url) {
      const {
        location: {
          protocol,
          host,
        },
      } = window;
      return util.openNewTab(protocol, host, url);
    },
  },
});
