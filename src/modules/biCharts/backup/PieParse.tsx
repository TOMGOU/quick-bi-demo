import { Component, Vue } from 'vue-property-decorator';
import Pie from './Pie.vue'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    width: '50%',
  },
  option: {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // orient: 'horizontal',
      top: '35%',
      left: '65%',
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      width: 10,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
    },
    series: [
      {
        name: '争议订单',
        type: 'pie',
        center: ['40%', '50%'],
        radius: ['30%', '90%'],
        color: ['#ffc148', '#4992ff', '#0CF9FF'],
        data: [
          {
            value: 10, 
            name: '处理中'
          },
          {
            value: 5,
            name: '支持经销店'
          },
          {
            value: 10,
            name: '支持车商'
          },
        ],
        itemStyle: {
          color: '#ff5a5a',
          normal: {
            label: {
              textStyle: {
                color: '#000',
              }
            }
          },
        },
        label: {
          show: true,
          color: '#fff',
          normal: {
            formatter: '{c}',
            position:'inside'
          },
          itemStyle: {
            color: '#ff5a5a'
          }
        },
      }
    ]
  }
}

type OptionType = any

@Component({
  components: {
    Pie,
  }
})
class PieParse extends Vue {

  static option: OptionType = option

  render (h, section, children) {
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'PieParse'
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
      <Pie
        { ..._propsOn }
      ></Pie>
    )
  }
}

// @ts-ignore
PieParse.des = '饼图'
// @ts-ignore
PieParse.icon = 'lx-icon-setting'

export default PieParse
