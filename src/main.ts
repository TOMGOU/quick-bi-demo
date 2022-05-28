import Vue from 'vue';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import { Component } from 'vue-property-decorator';
import ajax from '@/ajax/index';
import Modularize from '@lx-frontend/modularize';
import App from './App.vue';
import store from './vuex/store';
import '@lx-frontend/element-theme-dos-corp-master/dist/commons/index.css';
import '@lx-frontend/wrap-element-ui/packages/theme-default/lib/index.css';
import Qrcode from './plugins/qrcode'; // 二维码生成器
import router from './router'; // 路由配置
import './assets/styles/app.less';
// 样式文件
import './mixins/global.mixins';
// 全局mixin
import GlobalMixin from './mixins/global.ts.mixins';
// 微信SDK调用
import wechat from './wechat';
import WWOpenData from './WWOpenData';

if (process.env.NODE_ENV !== 'production') {
  import('./debug');
}
// 数据上报
const report = process.env.RUN_ENV === 'production' ? require('./report') : {};

Vue.use(ElementUI);
Vue.use(Qrcode);
Vue.use(VueLazyload, {
  preload: 1.3,
  error: './assets/styles/images/error.png',
  loading: '/static/loading.svg',
  listenEvents: ['mousewheel'],
});

Vue.use(Modularize, { router });
const modules = new Modularize();

Vue.config.productionTip = true;

Component.registerHooks([
  'beforeRouteLeave',
  'beforeRouteEnter',
]);
Vue.mixin(GlobalMixin);

/* eslint-disable no-new */
new Vue({
  router,
  store, // vuex
  ajax, // api
  modules,
  report, // sentry 数据上报
  wechat,
  WWOpenData,
  render: h => h(App),
}).$mount('#app');
