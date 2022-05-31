export default [
  { // BI看板 - 公开场数据监控
    path: '/lowCode/publicSession',
    component: resolve => import(/* webpackChunkName: "PublicSession" */ '../PublicSession.vue').then(resolve),
    meta: {
      title: '公开场数据监控',
      nav: '/lowCode/publicSession',
      breadCrumb: 'lowCode/公开场数据监控',
      noneKeepAlive: true,
    },
  },
  { // 配置页面
    path: '/lowCode/config',
    component: resolve => import(/* webpackChunkName: "Config" */ '../Config.vue').then(resolve),
    meta: {
      title: '配置页面',
      nav: '/lowCode/config',
      breadCrumb: 'lowCode/配置页面'
    },
  },
  { // 图表预览
    path: '/lowCode/chart',
    component: resolve => import(/* webpackChunkName: "Chart" */ '../Chart.vue').then(resolve),
    meta: {
      title: '图表预览',
      nav: '/lowCode/chart',
      breadCrumb: 'lowCode/图表预览'
    },
  }
];
