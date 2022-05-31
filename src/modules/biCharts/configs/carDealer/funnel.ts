export type carDealersFunnelDataKeys = 'conversion_rates' | 'dealer_counts' | 'monthly_growth_rates'

export interface CarDealersFunnelDataValues {
  name: string
  value: number
}

export type carDealersFunnelData = {
  [k in carDealersFunnelDataKeys]: CarDealersFunnelDataValues[]
}

// 车商漏斗图顶部Tab分类
export const carDealerTitles = [
  '转化率',
  '车商数',
  '同比增长率'
]

// 车商漏斗图类型分类
export const carDealerTypes = [
  {
    color: '#404ef5',
    name: '有效车商'
  },
  {
    color: '#5c90f7',
    name: '登入车商'
  },
  {
    color: '#71df7c',
    name: '浏览车商'
  },
  {
    color: '#73f5fd',
    name: '参拍车商'
  },
  {
    color: '#ed7f70',
    name: '中标车商'
  }
]

// 车商漏斗图基础配置
export const carDealerBasicSeries = {
  type: 'funnel',
  left: '15%',
  top: '5%',
  width: '65%',
  height: '80%',
  min: 0,
  max: 100,
  minSize: '0%',
  maxSize: '100%',
  sort: 'descending',
  label: {
    show: true,
    position: 'inside',
    color: '#000',
    fontSize: 10,
    formatter: ({ data }) => data.value
  },
  itemStyle: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1
  },
  labelLine: {
    show: false
  },
  emphasis: {
    label: {
      fontSize: 12
    }
  }
}

// 虚拟车商漏斗图左右两侧label的配置项
export const specialLabel = {
  show: true,
  position: 'left',
  formatter: ({ data }) => {
    if (data.realValue === null) return ''
    return data.realValue ? `${data.realValue}%` : '--'
  },
  color: '#fff',
  fontSize: 12,
}

/**
 * 对接口返回的图表数据填充「realValue」字段 以实现左右两侧数据渲染展示(即：渲染<->实际数据分离 实际会渲染3张同样漏斗图)
 * 1. 渲染使用中间漏斗图的数据(即：dealer_counts的数据)的「value」字段覆盖当前的原始数据
 * 2. 新增「realValue」字段 以实现label的正常展示
 * @param originData 接口图表原始数据
 * @param key 数据所对应的的key
 * @param renderData 当渲染左右两侧数据时 需要传入中间漏斗图的数据(即：dealer_counts的数据)
 */
export function fillRealValue (
  originData: CarDealersFunnelDataValues[],
  key: carDealersFunnelDataKeys,
  renderData?: CarDealersFunnelDataValues[],
) {
  const offsetList = key === 'conversion_rates'
    ? [{name: '', value: null}, ...originData] // 左侧数据(即：conversion_rates的数据)顶部不需要渲染 故填充一项空数据
    : originData
  return {
    data: offsetList.map(
      (item, index) => ({
        ...item,
        key,
        value: renderData ? renderData[index].value : item.value,
        realValue: item.value,
      })
    )
  }
}

// 车商漏斗图-车商数label提示框
export const numberTooltip = {
  tooltip: {
    trigger: 'item',
    formatter: ({ data }) => {
      return `${data.name} : ${data.value || '--'}`
    }
  },
}

// 车商漏斗图-百分比label提示框
export const percentTooltip = {
  tooltip: {
    trigger: 'item',
    formatter: ({ data }) => {
      return `${data.name} : ${data.realValue ? `${data.realValue}%` : '--'}`
    }
  },
}

/**
 * 车商漏斗图的配置项(实际会渲染3张同样漏斗图)
 * @param data 接口返回的图表数据
 */
export const carDealerOptions = ({ conversion_rates, dealer_counts, monthly_growth_rates }: carDealersFunnelData) => ({
  color: carDealerTypes.map(
    (item) => item.color
  ),
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      ...carDealerBasicSeries,
      ...fillRealValue(dealer_counts, 'dealer_counts'),
      ...numberTooltip,
      z: 200,
    },
    {
      ...carDealerBasicSeries,
      ...fillRealValue(conversion_rates, 'conversion_rates', dealer_counts),
      ...percentTooltip,
      label: specialLabel
    },
    {
      ...carDealerBasicSeries,
      ...fillRealValue(monthly_growth_rates, 'monthly_growth_rates', dealer_counts),
      ...percentTooltip,
      label: {
        ...specialLabel,
        position: 'right'
      }
    },
  ]
});
