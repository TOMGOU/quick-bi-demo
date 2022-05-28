export const queryMap = {
  clueManage: '线索管理',
  carManage: '车辆管理',
  auctionManage: '拍卖管理',
  enquiryMatch: '询价撮合',
  unsoldMatch: '流拍撮合',
  retailSold: '零售管理',
  otherSold: '其他出库管理'
}

const mapTabDetail = {
  clueManage: '线索详情',
  carManage: '车辆详情',
  auctionManage: '拍卖详情',
  enquiryMatch: '撮合详情',
  unsoldMatch: '撮合详情',
  retailSold: '出库信息',
  otherSold: '出库信息'
}

export const mapBreadCrumb = (pageType) => {
  return mapTabDetail[pageType]
}
