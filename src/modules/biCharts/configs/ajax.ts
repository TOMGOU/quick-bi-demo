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
  // T 计划场次统计数据
  getTPlanSessionData: ['get', '/bi_report/inner_tmpls/auction_datas'],
  // 获取topN省份
  getTopProvinces: ['get', '/bi_report/usedcar_dealers_monitor/provinces'],
  // 获取某个省份或全国的数据
  getProvinceData: ['get', '/bi_report/usedcar_dealers_monitor/provinces/:province_code'],
  // 获取地图geo
  getMapGeo: ['get', '/bi_report/geo_map/:area_code']
}
