import { normalPercentTooltip } from './activeAlert';

export type NewCarDealerDataKeys = 'activity_rates' | 'avg_participating_cars' | 'avg_winning_cars' | 'new_dealers'

export type NewCarDealerData = {
  [k in NewCarDealerDataKeys]: number[]
} & { dates: string[] }

type LabelPosition = 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'insideLeft' | 'insideRight' | 'insideTop'
  | 'insideBottom' | 'insideTopLeft' | 'insideBottomLeft' | 'insideTopRight' | 'insideBottomRight'

// 柱状图通用右边label
export const commonBarLabel = (position: LabelPosition) => ({
  label: {
    position,
    show: true,
    color: '#fff',
    formatter: ({ data }) => data || ''
  }
})

/**
 * 新增车商图表左侧块的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const newCarDealerLeft = (
  { new_dealers, activity_rates, dates }: NewCarDealerData,
  fontSize: number
) => (
  {
    color: ['#f6c35f'],
    tooltip: {
      trigger: 'item'
    },
    grid: [{
      left: '20%',
      bottom: '15%',
      top: '30%',
    }],
    xAxis: [
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
        position: 'top',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLabel: {
          show: true,
          formatter: '{value}%',
          textStyle: {
            fontSize,
          }
        },
      }
    ],
    yAxis: {
      type: 'category',
      data: dates,
      axisTick: {
        lineStyle: {
          color: 'transparent',
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, .8)"
        }
      },
      axisLabel: {
        textStyle: {
          fontSize,
        }
      },
    },
    legend: {
      data: [
        { name: '新增车商数', icon: 'rect' },
        { name: '活跃率' },
      ],
      textStyle: {
        fontSize,
        color: '#fff',
      },
      top: '5%'
    },
    series: [
      {
        ...commonBarLabel('right'),
        data: new_dealers,
        name: '新增车商数',
        type: 'bar',
        barWidth: '40%',
        xAxisIndex: 0,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(12, 249, 255, 0)'
        },
      },
      {
        ...normalPercentTooltip,
        name: '活跃率',
        type: 'line',
        symbolSize: 6,
        color: ['#ec6660'],
        xAxisIndex: 1,
        lineStyle: {
          color: '#ec6660'
        },
        data: activity_rates,
        label: {
          show: true,
          position: 'top',
          formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
          textStyle: {
            fontSize,
            align: 'center',
            color: '#ff5a5a',
          },
        },
      }
    ]
  }
)

/**
 * 新增车商图表右侧块的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const newCarDealerRight = (
  { avg_participating_cars, avg_winning_cars, dates }: NewCarDealerData,
  fontSize: number
) => (
  {
    color: ['#f6c35f', '#73f5fd'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [
        { name: '人均参拍车辆数', icon: 'rect' },
        { name: '人均中标车辆数', icon: 'rect'},
      ],
      textStyle: {
        fontSize,
        color: '#fff',
      },
      top: '5%'
    },
    grid: [{
      left: '15%',
      bottom: '15%',
      top: '30%',
    }],
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
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
    yAxis: {
      type: 'category',
      data: dates,
      axisTick: {
        lineStyle: {
          color: 'transparent',
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, .8)"
        }
      },
      axisLabel: {
        textStyle: {
          fontSize,
        }
      },
    },
    series: [
      {
        ...commonBarLabel('right'),
        name: '人均中标车辆数',
        type: 'bar',
        data: avg_winning_cars,
        label: {
          show: true,
          position: 'right',
          formatter: params => params.value ? `${params.value.toFixed(1)}` : ``,
          textStyle: {
            fontSize,
            color: '#fff',
          },
        },
      },
      {
        name: '人均参拍车辆数',
        type: 'bar',
        data: avg_participating_cars,
        label: {
          show: true,
          position: 'right',
          formatter: params => params.value ? `${params.value.toFixed(1)}` : ``,
          textStyle: {
            fontSize,
            color: '#fff',
          },
        },
      }
    ]
  }
)
