export default [
  { // BI看板 - 公开场数据监控
    path: '/biCharts/publicSession',
    component: resolve => import(/* webpackChunkName: "PublicSession" */ '../PublicSession.vue').then(resolve),
    meta: {
      title: 'BI看板',
      nav: '/biCharts/publicSession',
      breadCrumb: 'BI看板/公开场数据监控',
      noneKeepAlive: true,
    },
  },
  { // BI看板 - T计划&内部场数据监控
    path: '/biCharts/tPlanSession',
    component: resolve => import(/* webpackChunkName: "TPlanSession" */ '../TPlanSession.vue').then(resolve),
    meta: {
      title: 'BI看板',
      nav: '/biCharts/tPlanSession',
      breadCrumb: 'BI看板/T计划&内部场数据监控',
      noneKeepAlive: true,
    },
  },
  // BI看板 - 平台车商监控
  {
    path: '/biCharts/platformCarDealer',
    component: resolve => import(/* webpackChunkName: "TPlanSession" */ '../PlatformCarDealer.vue').then(resolve),
    meta: {
      title: 'BI看板',
      nav: '/biCharts/platformCarDealer',
      breadCrumb: 'BI看板/平台车商监控',
      noneKeepAlive: true,
    },
  }
];
