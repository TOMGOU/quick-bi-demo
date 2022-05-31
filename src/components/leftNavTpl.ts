export const leftNav: Menus[] = [
  {
    name: 'BI看板',
    icon: 'lx-icon-data',
    path: '',
    submenus: [
      {
        name: '公开场数据监控',
        path: '/biCharts/publicSession',
      },
      {
        name: '内部场拍卖数据',
        path: '/biCharts/tPlanSession',
      },
      {
        name: '平台车商监控',
        path: '/biCharts/platformCarDealer',
      }
    ]
  },
  {
    name: 'Low-Code',
    icon: 'lx-icon-document',
    path: '',
    submenus: [
      {
        name: '公开场数据监控',
        path: '/lowCode/publicSession',
      },
      {
        name: '配置页面',
        path: '/lowCode/config',
      }
    ]
  }
]

export interface Menus {
  name: string,
  icon?: string,
  path?: string,
  hasAuth?: boolean,
  auth?: string | Array<string>,
  submenus?: Menus[]
}
