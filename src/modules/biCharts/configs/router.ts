export default [
  { // BI看板 - 公开场数据监控
    path: '/biCharts/publicSession',
    component: resolve => import(/* webpackChunkName: "PublicSession" */ '../PublicSession.vue').then(resolve),
    meta: {
      title: '公开场数据监控',
      nav: '/biCharts/publicSession',
      breadCrumb: 'BI看板/公开场数据监控',
      noneKeepAlive: true,
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
  },
  { // 图表预览
    path: '/biCharts/chart',
    component: resolve => import(/* webpackChunkName: "Chart" */ '../Chart.vue').then(resolve),
    meta: {
      title: '图表预览',
      nav: '/biCharts/chart',
      breadCrumb: 'BI报表/图表预览'
    },
  }
];
