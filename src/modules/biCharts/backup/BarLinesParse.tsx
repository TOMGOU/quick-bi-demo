import { Component, Vue } from 'vue-property-decorator';
import BarLines from './BarLines.vue'
import * as echarts from 'echarts/core'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    width: "30vw",
    height: "20vh"
  },
  option: {
    color: ['#0cf9ff', '#0cf9ff', '#fff'],
    tooltip: {
      trigger: 'item'
    },
    grid: [{
      left: '10%',
      bottom: '15%',
      top: '30%',
      right: '12%'
    }],
    xAxis: {
      type: 'category',
      data: ['11.19', '11.20', '11.21', '11.22', '11.23', '11.24', '11.25'],
      axisLabel: {
        textStyle: {
          fontSize: 12
        }
      },
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        axisLabel: {
          textStyle: {
            fontSize: 12
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
        position: 'right',
        axisLabel: {  
          formatter: '{value}%',
          textStyle: {
            fontSize: 12
          }
        },
      }
    ],
    legend: {
      data: ['上拍台次', '拍出台次', '台次拍出率'],
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      top: '5%'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        name: '上拍台次',
        type: 'bar',
        barWidth: '20%',
        yAxisIndex: 0,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(12, 249, 255, 0)'
        },
      },
      {
        data: [10, 20, 50, 80, 170, 180, 30],
        name: '拍出台次',
        type: 'bar',
        barWidth: '20%',
        yAxisIndex: 0,
        showBackground: false,
        backgroundStyle: {
          color: 'rgba(12, 249, 255, 0)'
        },
        itemStyle: {
          color: '#ff5a5a'
        }
      },
      {
        name: '台次拍出率',
        type: 'line',
        symbolSize: 6,
        color: ['#ffc148'],
        yAxisIndex: 1,
        lineStyle: {
          color: '#ffc148'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 193, 72, 0.3)'
          }, {
            offset: 1,
            color: 'rgba(255, 193, 72, 0.1)'
          }])
        },
        data: [120, 120, 150, 180, 170, 110, 130],
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#ffc148'
          },
        },
      }
    ]
  }
}

type OptionType = any

@Component({
  components: {
    BarLines,
  }
})
class BarLinesParse extends Vue {

  static option: OptionType = option

  render (h, section, children) {
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'BarLinesParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      },
      props: {
        option: section.section.option.option,
        cssStyle: section.section.option.cssStyle,
      }
    }
    
    return (
      // @ts-ignore
      <BarLines
        { ..._propsOn }
      ></BarLines>
    )
  }
}

// @ts-ignore
BarLinesParse.des = '折线柱状图'
// @ts-ignore
BarLinesParse.icon = 'lx-icon-data'

export default BarLinesParse
