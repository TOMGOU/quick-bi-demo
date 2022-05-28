import { Component, Vue } from 'vue-property-decorator';
import MapTable from './MapTable.vue'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    bottom: '-100px',
    right: 0
  },
  option: {
    sessionName: '河南专场',
    tableData: [
      {
        store_name: '经销店1',
        auctions: '500',
        auction_rate: '70%'
      },
      {
        store_name: '经销店2',
        auctions: '500',
        auction_rate: '70%'
      },
      {
        store_name: '经销店3',
        auctions: '500',
        auction_rate: '70%'
      },
      {
        store_name: '经销店4',
        auctions: '500',
        auction_rate: '70%'
      },
      {
        store_name: '经销店5',
        auctions: '500',
        auction_rate: '70%'
      },
    ]
  }
}

@Component({
  components: {
    MapTable,
  }
})
class MapTableParse extends Vue {
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
        sessionName: section.section.option.option.sessionName,
        tableData: section.section.option.option.tableData,
        cssStyle: section.section.option.cssStyle,
      }
    }
    
    return (
      // @ts-ignore
      <MapTable
        { ..._propsOn }
      ></MapTable>
    )
  }
}

// @ts-ignore
MapTableParse.des = '地图详情表格'

export default MapTableParse
