import Vue from 'vue';
import { AxiosRequestConfig } from 'axios';
import { VueRouter } from 'vue-router/types/router.d';
import { Route } from 'vue-router';
// import { Api } from '@/rest/config';

declare module 'vue/types/vue' {
  // Vue 的全局属性
  interface Vue {
    $rest: any
    $route: Route
  }
}

declare module 'vue/types/options' {
  // Vue 构造函数接收的额外选项
  interface ComponentOptions<V extends Vue> {
    ajax?: object
    modules?: object
    report?: object
    router?: VueRouter
    wechat?: any
    WWOpenData?: any
  }
}

// 定义window上的属性
declare global {
  interface Window {
    // ga: any
    encodeURIComponent: any,
    decodeURIComponent: any,
    dataLayer: any
  }

  interface Document {
    [k:string]: any,
  }

  // rest 回调函数类型
  type queryCallback = (
    id?: string | number | { [index: string]: string },
    expand?: string, config2?: AxiosRequestConfig
  ) => Promise<any>
  type createCallback = (
    data?: object | void,
    expand?: string,
    config2?: AxiosRequestConfig
  ) => Promise<any>
  type putCallback = (
    data?: object | void,
    expand?: string,
    config2?: AxiosRequestConfig
  ) => Promise<any>
  type patchCallback = (
    data?: object | void,
    expand?: string,
    config2?: AxiosRequestConfig
  ) => Promise<any>
  type deleteCallback = (
    expand?: string,
    config2?: AxiosRequestConfig
  ) => Promise<any>
}

declare module 'vue-lazyload'
// declare module 'element-ui'
declare module '*.json' {
  const value: any;
  export default value;
}
