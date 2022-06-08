import { Component, Vue } from 'vue-property-decorator';
import MapTips from './MapTips.vue'
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
      {
        type: 'vue-color',
        label: '背景颜色',
        name: 'background',
        required: false,
        placeholder: '',
        value: ''
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
          sessionAuctions: 5000,
          sessionAuctionRate: '70.0%'
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
        value: '20%',
      },
      {
        type: 'el-input-text',
        label: '左边边距',
        name: 'left',
        required: false,
        placeholder: '',
        value: '35%',
      },
    ]
  }
}

@Component({
  components: {
    MapTips,
  }
})
class MapTipsParse extends Vue {
  static options: any = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
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
        cssStyle: options.cssStyle,
        // @ts-ignore
        tipsData: options.data.staticData
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
// @ts-ignore
MapTipsParse.icon = 'lx-icon-wx-card'

export default MapTipsParse
