import { Component, Vue } from 'vue-property-decorator';
import Map from './Map.vue'
import store from '@/vuex/store'
import * as echarts from 'echarts'
import { handleOptionsData } from '../../utils'
const china = require('../../map/china.json')
echarts.registerMap('CHINA', china)
const myItemStyle = {
  normal: {
    areaColor: '#ffe390',
    color: "#ffe390",
    borderColor: "#ffe390",
    borderWidth: 0,
    borderType: "solid",
    // opacity: .3,
    label: { show: false }
  },
  emphasis: {
    areaColor: '#ffe390',
    label: { show: false }
  },
}

const options = {
  code: 'barLineChart',
  type: 'chart',
  label: '地图',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '地图',
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
            bar1: 148,
            bar2: 508,
            line1: 14,
            name: 'Mon'
          },
          {
            bar1: 148,
            bar2: 408,
            line1: 64,
            name: 'Tue'
          },
          {
            bar1: 148,
            bar2: 608,
            line1: 24,
            name: 'Wed'
          },
          {
            bar1: 348,
            bar2: 208,
            line1: 84,
            name: 'Thu'
          },
          {
            bar1: 248,
            bar2: 108,
            line1: 64,
            name: 'Fri'
          },
          {
            bar1: 748,
            bar2: 108,
            line1: 24,
            name: 'Sat'
          },
          {
            bar1: 548,
            bar2: 168,
            line1: 54,
            name: 'Sun'
          },
        ]
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '图表宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '30vw',
      },
      {
        type: 'el-input-text',
        label: '图表高度',
        name: 'height',
        required: false,
        placeholder: '',
        value: '42vh',
      },
    ]
  }
}

@Component({
  components: {
    Map,
  }
})
class MapParse extends Vue {
  // static option = option
  static options: any = options
  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const optionsConfig: any = options.config;
    const optionsData: any = options.data;
    const option = {
      geo: {
        show: true,
        map: 'CHINA',
        label: {
          show: false
        },
        selectedMode: false,
        roam: false,
        itemStyle: {
          normal: {
            borderWidth: 4,
            borderColor: '#0cf9ff',
            areaColor: '#ffe390',
          },
          emphasis: {
            borderWidth: 4,
            borderColor: '#0cf9ff',
            areaColor: '#ffe390',
          }
        }
      },
      series: [
        {
          name: '中国地图',
          type: 'map',
          mapType: 'CHINA',
          label: {
            show: false,
          },
          selectedMode: false,
          itemStyle: {
            normal: {
              areaColor: '#0c1022',
              label: { show: false }
            },
            emphasis: {
              areaColor: '#0c1022',
              label: { show: false }
            },
          },
          // data: this.mapHLData
          data: [
              {name: '广东省', value: 20057, itemStyle: myItemStyle},
              {name: '湖南省', value: 31686, itemStyle: myItemStyle},
              {name: '湖北省', value: 6992, itemStyle: myItemStyle},
              {name: '四川省', value: 44045, itemStyle: myItemStyle},
              {name: '河南省', value: 40689, itemStyle: myItemStyle},
              // {name: '江西省', value: 37659, itemStyle: myItemStyle},
              // {name: '福建省', value: 45180, itemStyle: myItemStyle},
              // {name: '青海省', value: 55204, itemStyle: myItemStyle},
              // {name: '西藏自治区', value: 21900, itemStyle: myItemStyle},
              // {name: '新疆维吾尔自治区', value: 4918, itemStyle: myItemStyle},
              // {name: '内蒙古自治区', value: 5881, itemStyle: myItemStyle},
              // {name: '广西壮族自治区', value: 5881, itemStyle: myItemStyle},
              // {name: '宁夏回族自治区', value: 5881, itemStyle: myItemStyle},
              // {name: '云南省', value: 4178, itemStyle: myItemStyle},
              // {name: '安徽省', value: 2227, itemStyle: myItemStyle},
              // {name: '浙江省', value: 2180, itemStyle: myItemStyle},
              // {name: '山东省', value: 9172, itemStyle: myItemStyle},
              // {name: '黑龙江省', value: 9172, itemStyle: myItemStyle},
              // {name: '江苏省', value: 9172, itemStyle: myItemStyle},
              // {name: '贵州省', value: 9172, itemStyle: myItemStyle},
              // {name: '吉林省', value: 9172, itemStyle: myItemStyle},
              // {name: '辽宁省', value: 9172, itemStyle: myItemStyle},
              // {name: '河北省', value: 9172, itemStyle: myItemStyle},
              // {name: '甘肃省', value: 9172, itemStyle: myItemStyle},
              // {name: '山西省', value: 9172, itemStyle: myItemStyle},
              // {name: '海南省', value: 9172, itemStyle: myItemStyle},
              // {name: '台湾省', value: 9172, itemStyle: myItemStyle},
              // {name: '天津市', value: 9172, itemStyle: myItemStyle},
              // {name: '北京市', value: 9172, itemStyle: myItemStyle},
              // {name: '上海市', value: 9172, itemStyle: myItemStyle},
          ],
        }
      ]
    }
    const _props = {
      props: {
        option: option,
        cssStyle: options.cssStyle,
      }
    }
    const _propsOn = {
      on: {
        dragover: section.handleDrop,
        drop: section.handleDrop
      },
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'MapParse',
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      // @ts-ignore
      <Map
        { ..._props }
        { ..._propsOn }
      >
        { children }
      </Map>
    )
  }
}

// @ts-ignore
MapParse.key = 'MapParse'
// @ts-ignore
MapParse.des = '地图'
// @ts-ignore
MapParse.icon = 'lx-icon-address'

export default MapParse
