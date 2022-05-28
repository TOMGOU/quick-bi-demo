import Vue from 'vue';
import Router from 'vue-router';
// 同步路由参数
import {
  sync,
} from 'vuex-router-sync';
// vuex 仓库
import store from '../vuex/store';
// 缓存处理
import cache from '../common/cache';
// 路由配置
import routeConfig from './config';
import omit from 'lodash/omit'

Vue.use(Router);

// 构造路由
const router = new Router(routeConfig);

// 修改title
function changeTitle(title, src) {
  const tagTitle = document.getElementsByTagName('title')[0];
  tagTitle.innerText = title;
}

// 路由钩子
// S 转场动画
let historyCount = cache.getSessionData('count') * 1 || 0;
cache.setSessionData('/', 0);
const commit = store.commit || store.dispatch;
router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  // 路由变化，修改title
  if (meta && meta.title) {
    changeTitle(`经销商集团管理系统-${meta.title}`);
  }
  // 转场动画方向控制
  const toIndex = cache.getSessionData(to.path);
  const fromIndex = cache.getSessionData(from.path);
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward');
    } else {
      commit('UPDATE_DIRECTION', 'reverse');
    }
  } else {
    historyCount += 1;
    cache.setSessionData('count', historyCount);
    to.path !== '/' && cache.setSessionData(to.path, historyCount);
    commit('UPDATE_DIRECTION', 'forward');
  }
  // loading 动画
  if (meta && meta.needLoading) {
    store.dispatch('UPDATE_LOADING', {
      status: true,
      text: '加载中...',
    });
  }
  // 导航条控制
  if (meta) {
    store.commit('UPDATE_NAV', meta.hideNav);
    // store.commit('UPDATE_ALERT', meta.hideAlert);
    store.commit('UPDATE_ROUTER', meta.nav || to.path);
  }
  // 扫码登陆返回携带access-token
  const accessToken = to.query['access-token'];
  if (accessToken) {
    // 这里本地持久化用的是中间下划线的access_token 路由query参数则是access-token
    cache.setLocalStorageData('access_token', accessToken);
    // 去除掉query参数里的access-token
    const query = omit(to.query, ['access-token'])
    next({ path: to.path, query });
  } else {
    next();
  }
});
sync(store, router);

// E 转场动画

// 页面渲染完毕后关闭loading
router.afterEach((to) => {
  const env = 'replacing_env';
  // 百度 pv 统计
  if (env === 'production') {
    ba.trackPageview(to.path);
  }
  // 关闭loading
  const meta = to.meta || {};
  if (meta && meta.needLoading) {
    store.dispatch('UPDATE_LOADING', {
      status: false,
      time: 500,
    });
  }
});

export default router;
