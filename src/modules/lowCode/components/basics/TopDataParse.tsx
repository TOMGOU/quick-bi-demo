import { Component, Vue } from 'vue-property-decorator';
import TopData from './TopData.vue'
import * as echarts from 'echarts/core'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    'font-size': '0.16rem'
  },
  mapData: [
    {
      title: '今日上拍量',
      value: 2000
    },
    {
      title: '今日店均上拍量',
      value: 35
    },
    {
      title: '本月上拍台数',
      value: 6000
    },
    {
      title: '本月店均成交台数',
      value: 860
    },
  ]
}

@Component({
  components: {
    TopData,
  }
})
class TopDataParse extends Vue {
  static option: any = option

  render (h, section, children) {
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'TopDataParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      },
      props: {
        mapData: section.section.option.mapData,
        cssStyle: section.section.option.cssStyle,
      }
    }
    
    return (
      // @ts-ignore
      <TopData
        { ..._propsOn }
      ></TopData>
    )
  }
}

// @ts-ignore
TopDataParse.key = 'TopDataParse'
// @ts-ignore
TopDataParse.des = '总览数据表格'

export default TopDataParse
