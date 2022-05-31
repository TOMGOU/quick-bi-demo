import * as echarts from 'echarts'
import { formatterCircle } from './activeAlert';
import { commonBarLabel } from './newCarDealer';

export type monthlyActivityDataKeys = 'active_dealers' | 'active_rates' | 'avg_auction_cars' | 'avg_participating_cars'
  | 'avg_winning_cars' | 'login_dealers' | 'login_rates' | 'winning_dealers' | 'winning_rates'

export type monthlyActivityData = {
  [k in monthlyActivityDataKeys]: number[]
} & { dates: string[] }

/**
 * 生成图表完整统计数据的展示文本
 * @param params formatter callback的参数
 * @param percentSeriesName 需要添加百分比的key数组
 */
export function seriesListFormatter (params: any[], percentSeriesName: string[] = []) {
  const formatterFn = ({ seriesName, value, color }) => `${formatterCircle(color)}${seriesName} : ${value}`
  const totalStr = params.reduce(
    (pre, cur, index) => {
      const offset = percentSeriesName.includes(cur.seriesName) ? '%' : ''
      const br = index === params.length - 1 ? '' : '<br/>'
      return `${pre}${formatterFn(cur)}${offset}${br}`
    },
    ''
  )
  return `${params[0].name}<br/>${totalStr}`
}

/**
 * 加载时图表时动态生成legend宽度
 */
function getLegendWidth () {
  const [min, max] = [2100, 2350]
  const width = (window as any).innerWidth
  if (width < min) {
    return '85%'
  }
  if (width > min && width < max) {
    return '70%'
  }
  return '60%'
}

/**
 * 平台车商月活跃情况图表上方块的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const monthlyActivityTop = (
  {login_dealers, active_dealers, winning_dealers, login_rates, active_rates, winning_rates, dates}: monthlyActivityData,
  fontSize: number
) => (
  {
    color: ['#0CF9FF', '#FF5D5D', '#FFC85D', '#0CF9FF', '#ff5a5a', '#ffde81'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => seriesListFormatter(params, ['招募访问占比', '招募活跃占比', '招募中标占比'])
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      top: '40%',
      containLabel: true
    },
    legend: {
      width: getLegendWidth(),
      itemGap: 20,
      data: [
        {
          name: '访问车商数',
          icon: 'rect',
          itemStyle: {
            color: 'rgba(12, 249, 255, 0.3)'
          },
        },
        {
          name: '活跃车商数',
          icon: 'rect',
          itemStyle: {
            color: 'rgba(255, 90, 90, 0.5)'
          }
        },
        {
          name: '中标车商数',
          icon: 'rect',
          itemStyle: {
            color: 'rgba(255, 193, 72, 0.4)'
          },
        },
        { name: '招募访问占比' },
        { name: '招募活跃占比' },
        { name: '招募中标占比' },
      ],
      textStyle: {
        fontSize,
        color: '#fff',
      },
      top: '5%'
    },
    xAxis: [
      {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            fontSize
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize
          }
        },
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, .2)'
          },
          show: true
        }
      },
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize
          },
          formatter: '{value}%'
        },
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '访问车商数',
        type: 'line',
        yAxisIndex: 0,
        emphasis: {
          focus: 'series'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#28FAFF'
          }, {
            offset: 1,
            color: '#100B2A'
          }])
        },
        label: {
          show: true,
          color: '#28FAFF',
          position: 'top'
        },
        lineStyle: {
          color: 'transparent',
        },
        data: login_dealers
      },
      {
        name: '活跃车商数',
        type: 'line',
        yAxisIndex: 0,
        emphasis: {
          focus: 'series'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#FF5D5D'
          }, {
            offset: 1,
            color: '#100B2A'
          }])
        },
        lineStyle: {
          color: 'transparent',
        },
        data: active_dealers
      },
      {
        name: '中标车商数',
        type: 'line',
        yAxisIndex: 0,
        emphasis: {
          focus: 'series'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#FFC85D'
          }, {
            offset: 1,
            color: '#100B2A'
          }])
        },
        lineStyle: {
          color: 'transparent',
        },
        data: winning_dealers
      },
      {
        name: '招募访问占比',
        smooth: 0.6,
        type: 'line',
        yAxisIndex: 1,
        color: ['#0cf9ff'],
        lineStyle: {
          color: '#0cf9ff'
        },
        data: login_rates
      },
      {
        name: '招募活跃占比',
        type: 'line',
        smooth: 0.6,
        yAxisIndex: 1,
        color: ['#ff5a5a'],
        lineStyle: {
          color: '#ff5a5a'
        },
        data: active_rates
      },
      {
        name: '招募中标占比',
        type: 'line',
        smooth: 0.6,
        yAxisIndex: 1,
        color: ['#ffc148'],
        lineStyle: {
          color: '#ffc148'
        },
        data: winning_rates
      }
    ]
  }
)

/**
 * 平台车商月活跃情况图表下方块的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const monthlyActivityBottom = (
  {avg_participating_cars, avg_winning_cars, avg_auction_cars, dates}: monthlyActivityData,
  fontSize: number
) => (
  {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => seriesListFormatter(params)
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisTick: {
        lineStyle: {
          color: 'transparent',
        }
      },
      axisLine: {
        lineStyle: {
          color: "transparent"
        }
      },
      axisLabel: {
        textStyle: {
          fontSize
        }
      },
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLabel: {
          textStyle: {
            fontSize
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, .2)'
          },
          show: true
        }
      },
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize
          }
        },
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    legend: {
      data: [
        { name: '人均参拍车辆数', icon: 'rect' },
        { name: '人均中标车辆数', icon: 'rect' },
        { name: '参拍人数/上拍台次' },
      ],
      textStyle: {
        color: '#fff',
        fontSize
      },
      top: '5%'
    },
    series: [
      {
        ...commonBarLabel('top'),
        data: avg_participating_cars,
        name: '人均参拍车辆数',
        type: 'bar',
        barWidth: '15%',
        yAxisIndex: 0,
        itemStyle: {
          color: '#0cf9ff'
        },
        label: {
          show: true,
          position: 'top',
          formatter: params => params.value ? `${params.value.toFixed(1)}` : ``,
          textStyle: {
            fontSize,
            align: 'center',
            color: '#fff',
          },
        },
      },
      {
        ...commonBarLabel('top'),
        data: avg_winning_cars,
        name: '人均中标车辆数',
        type: 'bar',
        barWidth: '15%',
        yAxisIndex: 0,
        itemStyle: {
          color: '#ffc148'
        },
        label: {
          show: true,
          position: 'top',
          formatter: params => params.value ? `${params.value.toFixed(1)}` : ``,
          textStyle: {
            fontSize,
            align: 'center',
            color: '#fff',
          },
        },
      },
      {
        name: '参拍人数/上拍台次',
        type: 'line',
        symbolSize: 6,
        color: ['#4992ff'],
        yAxisIndex: 1,
        lineStyle: {
          color: '#4992ff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(73, 146, 255, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(73, 146, 255, 0)'
          }])
        },
        data: avg_auction_cars,
        label: {
          show: true,
          position: 'top',
          formatter: params => params.value ? `${params.value.toFixed(2)}` : `--`,
          textStyle: {
            fontSize,
            align: 'center',
            color: '#4992ff',
          },
        },
      }
    ]
  }
)

// 平台车商月活跃情况图表的自定义样式
export const monthlyActivityBoxCss = {
  'display': 'grid',
  'grid-template-columns': '100%',
  'grid-template-rows': '50% 50%',
  'justify-items': 'center'
}

export const monthlyActivityMaskCss = {
  height: 'calc((100% - 20px) * 2)',
}
