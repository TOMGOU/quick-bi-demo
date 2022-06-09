import { Component, Vue } from 'vue-property-decorator';
import MapTable from './MapTable.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'

const options = {
  code: 'MapTips',
  type: 'container',
  label: '提示框',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '提示框',
      },
    ],
    data: [
      {
        type: 'el-radio-group',
        label: '数据类型',
        name: 'dataType',
        require: false,
        placeholder: '',
        selectValue: true,
        selectOptions: [
          {
            code: 'staticData',
            name: '静态数据',
          },
          {
            code: 'dynamicData',
            name: '动态数据',
          },
        ],
        value: 'staticData',
      },
      {
        type: 'el-input-number',
        label: '刷新时间(毫秒)',
        name: 'refreshTime',
        reverseStamp: 'staticData',
        value: 5000
      },
      {
        type: 'el-input-text',
        label: '接口地址',
        name: 'api',
        reverseStamp: 'staticData',
        value: 'api/v1/...'
      },
      {
        type: 'el-button',
        label: '静态数据',
        name: 'staticData',
        required: false,
        placeholder: '',
        reverseStamp: 'dynamicData',
        value: {
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
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '顶部边距',
        name: 'top',
        required: false,
        placeholder: '',
        value: '250px',
      },
      {
        type: 'el-input-text',
        label: '左边边距',
        name: 'left',
        required: false,
        placeholder: '',
        value: '300px',
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
  static options: any = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'MapTableParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      },
      props: {
        cssStyle: options.cssStyle,
        // @ts-ignore
        mapData: options.data.staticData
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
MapTableParse.key = 'MapTableParse'
// @ts-ignore
MapTableParse.des = '地图详情表格'
// @ts-ignore
MapTableParse.icon = 'lx-icon-excel'

export default MapTableParse
