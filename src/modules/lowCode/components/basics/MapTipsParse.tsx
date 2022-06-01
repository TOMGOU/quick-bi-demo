import { Component, Vue } from 'vue-property-decorator';
import MapTips from './MapTips.vue'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    left: '41.3%',
    top: '40%'
  },
  option: {
    sessionName: '河南专场',
    sessionAuctions: 5000,
    sessionAuctionRate: '70.0%'
  },
}

@Component({
  components: {
    MapTips,
  }
})
class MapTipsParse extends Vue {
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
        sessionName: section.section.option.sessionName,
        sessionAuctions: section.section.option.sessionAuctions,
        sessionAuctionRate: section.section.option.sessionAuctionRate,
        cssStyle: section.section.option.cssStyle,
      }
    }
    
    return (
      // @ts-ignore
      <MapTips
        { ..._propsOn }
      ></MapTips>
    )
  }
}

// @ts-ignore
MapTipsParse.key = 'MapTipsParse'
// @ts-ignore
MapTipsParse.des = '提示框'

export default MapTipsParse
