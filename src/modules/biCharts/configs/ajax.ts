const mockConfig = {
  // baseUrl: 'https://yapi.lixinio.com/mock/60/api/v1',
  // baseUrl: 'https://yapi.lixinio.com/mock/209/api/v1',
  // baseUrl: 'https://yapi.lixinio.com/mock/359/api/v1', // 集团四期
}

export default {
  // 所有场次
  getPublicSession: ['get', '/bi_report/public_session_tmpls'],
  // 场次统计数据
  getPublicSessionData: ['get', '/bi_report/public_session_tmpls/:id'],
  // 保存图表配置数据
  postChartsConfig: ['post', '/index/update', {baseUrl: 'http://127.0.0.1:8360/api/v1'}],
  // 获取图表配置数据
  fetchChartConfig: ['get', '/index/list', {baseUrl: 'http://127.0.0.1:8360/api/v1'}],
  // 获取图表数据
  fetchChartData: address => ['get', address, {baseUrl: 'http://127.0.0.1:8360/api/v1'}]
}
