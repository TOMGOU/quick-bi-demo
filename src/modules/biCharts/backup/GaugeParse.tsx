import { Component, Vue } from 'vue-property-decorator';
import Gauge from './Gauge.vue'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    width: '50%',
  },
  option: {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#0CF9FF'],
              [0.7, '#4992ff'],
              [1, '#ff5a5a']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -15,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          distance: -15,
          length: 15,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 20,
          fontSize: 6
        },
        title: {
          show : true,
          offsetCenter: [0, '75%'],
          textStyle: {
            fontSize: 12,
            color: '#ff5a5a'
          }
        },
        detail: {
          valueAnimation: true,
          formatter: value => value === 0 ? `${value}%` : `${value.toFixed(1)}%`,
          textStyle:{
            fontSize: 12,
            color: '#ff5a5a'
          },
          offsetCenter: [0, "50%"],
        },
        data: [{
          value: 70,
          name: '关单率',
        }]
      },
    ]
  }
}

type OptionType = any

@Component({
  components: {
    Gauge,
  }
})
class GaugeParse extends Vue {

  static option: OptionType = option

  render (h, section, children) {
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'GaugeParse'
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
      <Gauge
        { ..._propsOn }
      ></Gauge>
    )
  }
}

// @ts-ignore
GaugeParse.des = '仪表盘'
// @ts-ignore
GaugeParse.icon = 'lx-icon-steering-wheel'

export default GaugeParse
