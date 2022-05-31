import map from 'lodash/map'
import { commonBarLabel } from './newCarDealer';

export interface ActiveAlert {
  active_rate: number
  name: string
  valid_dealer: number
}

export type ActiveAlertData = ActiveAlert[]

/**
 * 生成ECharts默认label中代表数据颜色的圆圈
 * @param color 图标颜色(从formatter的callback函数取)
 */
export function formatterCircle (color: string) {
  return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color: ${color}"></span>`
}

// 平常需要显示百分比的label
export const normalPercentTooltip = {
  tooltip: {
    trigger: 'item',
    formatter: ({ name, value, seriesName, color }) => `${seriesName}<br/>${formatterCircle(color)}${name} : ${value}%`
  },
}

/**
 * 活跃预警图表的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const activeAlertOptions = (
  data: ActiveAlertData,
  fontSize: number
) => {
  const [names, rates, dealers] = [
    map(data, 'name'),
    map(data, 'active_rate'),
    map(data, 'valid_dealer')
  ]

  return (
    {
      color: ['#73f5fd'],
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
        data: names,
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
          width: 70,
          overflow: 'truncate',
          textStyle: {
            fontSize,
          }
        },
      },
      legend: {
        data: [
          { name: '有效车商数', icon: 'rect' },
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
          data: dealers,
          name: '有效车商数',
          type: 'bar',
          barWidth: 14,
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
          symbolSize: 0,
          color: ['#ec6660'],
          xAxisIndex: 1,
          lineStyle: {
            color: '#ec6660'
          },
          data: rates,
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
}
