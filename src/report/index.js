/**
 * 数据上报
 */
import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import config from './config';

// 本地开发环境和测试环境不上报
if (config.environment === 'production') {
  Sentry.init({
    ...config,
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
  });
  Vue.prototype.$report = Sentry;
}

// 测试sentry是否正常配置
if (Sentry.captureMessage && config.environment === 'production' && process.env.SENTRY_TEST) {
  Sentry.captureMessage('test~');
}
export default Sentry;
