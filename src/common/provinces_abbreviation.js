const abbreviations = [
  {
    code: '110000',
    value: '京',
    name: '北京',
  },
  {
    code: '120000',
    value: '津',
    name: '天津市',
  },
  {
    code: '130000',
    value: '冀',
    name: '河北省',
  },
  {
    code: '140000',
    value: '晋',
    name: '山西省',
  },
  {
    code: '150000',
    value: '蒙',
    name: '内蒙古自治区',
  },
  {
    code: '210000',
    value: '辽',
    name: '辽宁省',
  },
  {
    code: '220000',
    value: '吉',
    name: '吉林省',
  },
  {
    code: '230000',
    value: '黑',
    name: '黑龙江省',
  },
  {
    code: '310000',
    value: '沪',
    name: '上海市',
  },
  {
    code: '320000',
    value: '苏',
    name: '江苏省',
  },
  {
    code: '330000',
    value: '浙',
    name: '浙江省',
  },
  {
    code: '340000',
    value: '皖',
    name: '安徽省',
  },
  {
    code: '350000',
    value: '闽',
    name: '福建省',
  },
  {
    code: '360000',
    value: '赣',
    name: '江西省',
  },
  {
    code: '370000',
    value: '鲁',
    name: '山东省',
  },
  {
    code: '410000',
    value: '豫',
    name: '河南省',
  },
  {
    code: '420000',
    value: '鄂',
    name: '湖北省',
  },
  {
    code: '430000',
    value: '湘',
    name: '湖南省',
  },
  {
    code: '440000',
    value: '粤',
    name: '广东省',
  },
  {
    code: '450000',
    value: '桂',
    name: '广西壮族自治区',
  },
  {
    code: '460000',
    value: '琼',
    name: '海南省',
  },
  {
    code: '500000',
    value: '渝',
    name: '重庆市',
  },
  {
    code: '510000',
    value: '川',
    name: '四川省',
  },
  {
    code: '520000',
    value: '贵',
    name: '贵州省',
  },
  {
    code: '530000',
    value: '云',
    name: '云南省',
  },
  {
    code: '540000',
    value: '藏',
    name: '西藏自治区',
  },
  {
    code: '610000',
    value: '陕',
    name: '陕西省',
  },
  {
    code: '620000',
    value: '甘',
    name: '甘肃省',
  },
  {
    code: '630000',
    value: '青',
    name: '青海省',
  },
  {
    code: '640000',
    value: '宁',
    name: '宁夏回族自治区',
  },
  {
    code: '650000',
    value: '新',
    name: '新疆维吾尔自治区',
  },
];

/**
 * 基于省份code获取省份简称
 */
function getProvinceAbbreviation (provinceCode) {
  const res = abbreviations.find(province => province.code === provinceCode);
  return res ? res.value : '京';
}

export {
  abbreviations,
  getProvinceAbbreviation,
};
