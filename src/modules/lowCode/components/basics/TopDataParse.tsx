import { Component, Vue } from 'vue-property-decorator';
import TopData from './TopData.vue'
import * as echarts from 'echarts/core'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'


const options = {
  code: 'TopData',
  type: 'container',
  label: '总览数据表格',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '总览数据表格',
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
        value: [
          {
            title: '今日上拍量',
            value: 2000
          },
          {
            title: '今日店均上拍量',
            value: 135
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
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '字体大小',
        name: 'font-size',
        required: false,
        placeholder: '',
        value: '0.16rem',
      },
    ]
  }
}

@Component({
  components: {
    TopData,
  }
})
class TopDataParse extends Vue {
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
        // mapData: section.section.option.mapData,
        // cssStyle: section.section.option.cssStyle,
        jsonSchema: section.section,
        cssStyle: options.cssStyle,
        // @ts-ignore
        mapData: options.data.staticData,
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
// @ts-ignore
TopDataParse.icon = 'lx-icon-ID'

export default TopDataParse
