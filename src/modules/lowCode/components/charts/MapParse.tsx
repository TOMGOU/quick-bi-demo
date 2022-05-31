import { Component, Vue } from 'vue-property-decorator';
import Map from './Map.vue'
import store from '@/vuex/store'
import * as echarts from 'echarts'
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
const option = {
  cssStyle: {
    width: '100%',
    height: '40vh'
  },
  option: {
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
}

@Component({
  components: {
    Map,
  }
})
class MapParse extends Vue {
  static option = option
  render (h, section, children) {
    const _props = {
      props: {
        option: section.section.option.option,
        cssStyle: section.section.option.cssStyle,
        jsonSchema: section.section
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
MapParse.des = '地图'
// @ts-ignore
MapParse.icon = 'lx-icon-address'

export default MapParse
