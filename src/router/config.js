/**
 * 路由
 */
export default {
  mode: 'history',
  routes: [{ // 默认打开页面
    path: '/', // 请不要移动这个配置的位置
    redirect: '/index',
  },
    { // 首页
      path: '/index',
      component: resolve => import(/* webpackChunkName: "entry" */ '../modules/Index').then(resolve),
      meta: {
        title: '首页',
      },
    }
  ],
};
