import { seriesListFormatter } from './monthlyActivity';

export type carDealerTypesDataKeys = 'A' | 'A1' | 'A2' | 'A3' | 'B' | 'C' | 'D' | 'E'

export type carDealerTypesData = {
  [k in carDealerTypesDataKeys]: number[]
} & {dates: string[]}

/**
 * 车商类型分布图表的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const carDealerTypesOptions = (
  {A, A1, A2, A3, B, C, D, E, dates}: carDealerTypesData,
  fontSize: number
) => (
  {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => seriesListFormatter(params, ['A1占比', 'A2占比', 'A3占比'])
    },
    color: ['#00f8ff', '#30fd86', '#3679df', '#304afa', '#7146fa'],
    legend: {
      data: [
        { name: 'A', icon: 'rect' },
        { name: 'B', icon: 'rect' },
        { name: 'C', icon: 'rect' },
        { name: 'D', icon: 'rect' },
        { name: 'E', icon: 'rect' },
        { name: 'A1占比' },
        { name: 'A2占比' },
        { name: 'A3占比' },
      ],
      textStyle: {
        fontSize,
        color: '#fff',
      },
      top: '5%'
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: dates,
        axisLabel: {
          textStyle: {
            fontSize
          },
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize
          },
          formatter: '{value}'
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
        name: 'A',
        type: 'bar',
        stack: 'Ad',
        barWidth: '35%',
        label: {
          fontSize,
          show: true,
          color: '#000'
        },
        data: A
      },
      {
        name: 'B',
        type: 'bar',
        stack: 'Ad',
        barWidth: '35%',
        label: {
          fontSize,
          show: true,
          color: '#000'
        },
        data: B
      },
      {
        name: 'C',
        type: 'bar',
        stack: 'Ad',
        barWidth: '35%',
        label: {
          fontSize,
          show: true,
          color: '#000'
        },
        data: C
      },
      {
        name: 'D',
        type: 'bar',
        stack: 'Ad',
        barWidth: '35%',
        label: {
          fontSize,
          show: true,
          color: '#000'
        },
        data: D
      },
      {
        name: 'E',
        type: 'bar',
        stack: 'Ad',
        barWidth: '35%',
        label: {
          fontSize,
          show: true,
          color: '#000'
        },
        data: E
      },
      {
        name: 'A1占比',
        type: 'line',
        symbolSize: 6,
        color: ['#f6c35f'],
        yAxisIndex: 1,
        lineStyle: {
          color: '#f6c35f'
        },
        data: A1
      },
      {
        name: 'A2占比',
        type: 'line',
        symbolSize: 6,
        color: ['#ec6660'],
        yAxisIndex: 1,
        lineStyle: {
          color: '#ec6660'
        },
        label: {
          show: false,
        },
        data: A2
      },
      {
        name: 'A3占比',
        type: 'line',
        symbolSize: 6,
        color: ['#ed6fbe'],
        yAxisIndex: 1,
        lineStyle: {
          color: '#ed6fbe'
        },
        data: A3
      }
    ]
  }
)
