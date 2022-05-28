/**
 * mixins to Wechat Class
 */
// 缓存处理
// import rest from '../rest';

export default {
  jsApiList: ['agentConfig', 'config'],
  agentConfig(config) {
    return new Promise((success, fail) => {
      wx.agentConfig({ ...config, success, fail });
    }).then(res => {
      console.info('wx.agentConfig success', res);
      return res;
    }, error => {
      console.error('wx.agentConfig fail', error);
      throw error;
    });
  },
  config(config) {
    return new Promise((resolve, reject) => {
      wx.config(config);
      console.info('wx.config', config);
      wx.ready(resolve);
      wx.error(reject);
    }).then(res => {
      console.info('wx.config success', res);
      return res;
    }, error => {
      console.error('wx.config fail', error);
      throw error;
    });
  },
};
