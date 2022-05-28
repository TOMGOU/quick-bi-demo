export const leftNav: Menus[] = [
  {
    name: 'BI报表',
    icon: 'lx-icon-document',
    path: '',
    submenus: [
      {
        name: '公开场数据监控',
        path: '/biCharts/publicSession',
      },
      {
        name: '配置页面',
        path: '/biCharts/config',
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
