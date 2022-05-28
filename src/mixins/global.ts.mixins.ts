/**
 * 全局混合
 */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import util from '@/common/util';
import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import cache from '@/common/cache'

declare module 'vue/types/vue' {
  interface Vue {
    storeId: any
    hasAuth(auth: any): boolean
    checkAuth(): any
    showToast(text: string): void
    switchLoading(loading: any): void
    encodeURIComponent(param: any): void
    decodeURIComponent(param: any): void
    openNewTab(url: string): void
    getCbsReportUrl(id: number | string): string
  }
}

@Component
export default class GlobalMixin extends Vue {
  // 校验是否有对应的权限
  hasAuth(auth) {
    const { authList = [] } = this.$store.state;
    return authList && authList.some(val => val === auth);
  }

  // 异步获取权限
  checkAuth() {
    return this.$store.dispatch('UPDATE_USERINFO', {
      message: this.$message,
    });
  }

  showToast(text) {
    this.$store.dispatch('UPDATE_TOAST', {
      show: true,
      text,
    });
  }

  switchLoading(loading) {
    this.$store.dispatch('UPDATE_LOADING', {
      status: loading.status || false,
      text: loading.text || '',
      time: loading.time || 0,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  encodeURIComponent(param) {
    // 适配encodeURIComponent方法，将undefined更改为空字符串
    const paramStr = '';
    if (param === undefined) {
      return paramStr;
    }
    return window.encodeURIComponent(param);
  }

  // eslint-disable-next-line class-methods-use-this
  decodeURIComponent(param) {
    // 适配decodeURIComponent方法，将undefined更改为空字符串
    const paramStr = '';
    if (param === undefined) {
      return paramStr;
    }
    return window.decodeURIComponent(param);
  }

  // eslint-disable-next-line class-methods-use-this
  openNewTab(url) {
    const {
      location: {
        protocol,
        host,
      },
    } = window;
    return util.openNewTab(protocol, host, url);
  }

  // 获取查博士检测报告url
  getCbsReportUrl(id) {
    const token = cache.getLocalStorageData('access_token')
    const requestUrl = `/api/v1/used_car/auction_cars/cbs_report/${id}/detail`
    const { protocol, host } = window.location
    return `${protocol}//${host}${requestUrl}?access-token=${token}`
  }
}
