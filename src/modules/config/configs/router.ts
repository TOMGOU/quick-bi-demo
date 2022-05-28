export default [
  { // 配置页面
    path: '/config',
    component: resolve => import(/* webpackChunkName: "Config" */ '../Config.vue').then(resolve),
    meta: {
      title: '配置页面',
      nav: '/config',
      breadCrumb: '配置页面'
    },
  }
];
