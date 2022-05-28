/**
 * mixins to WWOpenData Class
 */
export default {
  bind(dom) {
    WWOpenData.bind(dom);
  },
  bindAll(doms) {
    WWOpenData.bindAll(doms);
  },
  checkSession(fail) {
    WWOpenData.checkSession({
      success: () => {
        console.info('open-data 登录态校验成功');
      },
      fail,
    });
  },
  on(event, callback) {
    WWOpenData.on(event, callback);
  },
  prefetch(object, callback) {
    WWOpenData.prefetch(object, callback);
  }
};
