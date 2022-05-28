export default [
  { // 二手车 - 线索管理
    path: '/biCharts/publicSession',
    component: resolve => import(/* webpackChunkName: "PublicSession" */ '../PublicSession.vue').then(resolve),
    meta: {
      title: '公开场数据监控',
      nav: '/biCharts/publicSession',
      breadCrumb: 'BI报表/公开场数据监控'
    },
  },
  { // 配置页面
    path: '/biCharts/config',
    component: resolve => import(/* webpackChunkName: "Config" */ '../Config.vue').then(resolve),
    meta: {
      title: '配置页面',
      nav: '/biCharts/config',
      breadCrumb: 'BI报表/配置页面'
    },
  }
];
