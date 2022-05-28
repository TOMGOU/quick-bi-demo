import { Component, Vue, Inject } from 'vue-property-decorator';
import BarLine from './BarLine.vue'
import * as echarts from 'echarts/core'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'
import {
  setOptionsTitle,
  setOptionsX,
  setOptionsY,
  setOptionsTop,
  setOptionsBar,
  setOptionsLegend,
  setOptionsTooltip,
  setOptionsMargin,
  staticDataFn
} from '../../tools'
const axios = require('axios');

const options = {
  code: 'barLineChart',
  type: 'chart',
  label: '混合图',
  icon: 'lx-icon-data',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '图表名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '混合图',
      },
      {
        type: 'vue-color',
        label: '背景颜色',
        name: 'background',
        required: false,
        placeholder: '',
        value: ''
      },
      [
        {
          name: '折线设置',
          list: [
            {
              type: 'el-switch',
              label: '标记点',
              name: 'markPoint',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-slider',
              label: '点大小',
              name: 'pointSize',
              required: false,
              placeholder: '',
              value: 5,
            },
            {
              type: 'el-switch',
              label: '平滑曲线',
              name: 'smoothCurve',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-switch',
              label: '面积堆积',
              name: 'area',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-slider',
              label: '面积厚度',
              name: 'areaThickness',
              required: false,
              placeholder: '',
              value: 5,
            },
            {
              type: 'el-slider',
              label: '线条宽度',
              name: 'lineWidth',
              required: false,
              placeholder: '',
              value: 3,
            },
          ],
        },
        {
          name: '柱体设置',
          list: [
            {
              type: 'el-slider',
              label: '最大宽度',
              name: 'maxWidth',
              required: false,
              placeholder: '',
              value: 10,
            },
            {
              type: 'el-slider',
              label: '圆角',
              name: 'radius',
              require: false,
              placeholder: '',
              value: 5,
            },
            {
              type: 'el-slider',
              label: '最小高度',
              name: 'minHeight',
              require: false,
              placeholder: '',
              value: 0,
            },
          ],
        },
        {
          name: '标题设置',
          list: [
            {
              type: 'el-switch',
              label: '标题',
              name: 'isNoTitle',
              required: false,
              placeholder: '',
              value: true
            },
            {
              type: 'el-input-text',
              label: '标题',
              name: 'titleText',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'textColor',
              required: false,
              placeholder: '',
              value: '#fff'
            },
            {
              type: 'el-select',
              label: '字体粗细',
              name: 'textFontWeight',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'normal', name: '正常'},
                {code: 'bold', name: '粗体'},
                {code: 'bolder', name: '特粗体'},
                {code: 'lighter', name: '细体'}
              ],
              value: 'normal'
            },
            {
              type: 'el-input-number',
              label: '字体大小',
              name: 'textFontSize',
              required: false,
              placeholder: '',
              value: 20
            },
            {
              type: 'el-select',
              label: '字体位置',
              name: 'textAlign',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'center', name: '居中'},
                {code: 'left', name: '左对齐'},
                {code: 'right', name: '右对齐'},
              ],
              value: 'left'
            },
            {
              type: 'el-input-text',
              label: '副标题',
              name: 'subText',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'subTextColor',
              required: false,
              placeholder: '',
              value: '#fff'
            },
            {
              type: 'el-select',
              label: '字体粗细',
              name: 'subTextFontWeight',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'normal', name: '正常'},
                {code: 'bold', name: '粗体'},
                {code: 'bolder', name: '特粗体'},
                {code: 'lighter', name: '细体'}
              ],
              value: 'normal'
            },
            {
              type: 'el-input-number',
              label: '字体大小',
              name: 'subTextFontSize',
              required: false,
              placeholder: '',
              value: 20
            },
          ],
        },
        {
          name: 'X轴设置',
          list: [
            {
              type: 'el-switch',
              label: '显示',
              name: 'hideX',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-input-text',
              label: '坐标名',
              name: 'xName',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '坐标名颜色',
              name: 'nameColorX',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '坐标字号',
              name: 'nameFontSizeX',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'vue-color',
              label: '数值颜色',
              name: 'Xcolor',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '数值字号',
              name: 'fontSizeX',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'el-slider',
              label: '数值角度',
              name: 'textAngle',
              required: false,
              placeholder: '',
              value: 0
            },
            {
              type: 'el-input-number',
              label: '数值间隔',
              name: 'textInterval',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'el-switch',
              label: '轴反转',
              name: 'reversalX',
              required: false,
              placeholder: '',
              value: false
            },
            {
              type: 'vue-color',
              label: '轴颜色',
              name: 'lineColorX',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-switch',
              label: '分割线显示',
              name: 'isShowSplitLineX',
              require: false,
              placeholder: '',
              value: false,
            },
            {
              type: 'vue-color',
              label: '分割线颜色',
              name: 'splitLineColorX',
              required: false,
              placeholder: '',
              value: '#fff',
            }
          ],
        },
        {
          name: 'Y轴设置',
          list: [
            {
              type: 'el-switch',
              label: '左显示',
              name: 'isShowYLeft',
              require: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-input-text',
              label: '左坐标名',
              name: 'textNameYLeft',
              require: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '左坐标名颜色',
              name: 'nameColorYLeft',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '左坐标字号',
              name: 'namefontSizeYLeft',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'el-input-number',
              label: '左均分',
              name: 'splitNumberLeft',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'el-switch',
              label: '右显示',
              name: 'isShowYRight',
              require: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-input-text',
              label: '右坐标名',
              name: 'textNameYRight',
              require: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '右坐标名颜色',
              name: 'nameColorYRight',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '右坐标字号',
              name: 'namefontSizeYRight',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'el-input-number',
              label: '右均分',
              name: 'splitNumberRight',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'vue-color',
              label: '数值颜色',
              name: 'colorY',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '数值字号',
              name: 'fontSizeY',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'el-switch',
              label: '轴反转',
              name: 'reversalY',
              required: false,
              placeholder: '',
              value: false
            },
            {
              type: 'vue-color',
              label: '轴颜色',
              name: 'lineColorY',
              required: false,
              placeholder: '',
              value: '#fff',
            },
          ],
        },
        {
          name: '折线数值设定',
          list: [
            {
              type: 'el-switch',
              label: '显示',
              name: 'isShowLine',
              required: false,
              placeholder: '',
              value: false
            },
            {
              type: 'el-input-number',
              label: '距离',
              name: 'distanceLine',
              required: false,
              placeholder: '',
              value: 5
            },
            {
              type: 'el-input-number',
              label: '字体字号',
              name: 'fontSizeLine',
              required: false,
              placeholder: '',
              value: 14
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'subTextColorLine',
              required: false,
              placeholder: '',
              value: '#fff'
            },
            {
              type: 'el-select',
              label: '字体粗细',
              name: 'fontWeightLine',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'normal', name: '正常'},
                {code: 'bold', name: '粗体'},
                {code: 'bolder', name: '特粗体'},
                {code: 'lighter', name: '细体'}
              ],
              value: 'normal'
            },
          ],
        },
        {
          name: '柱体数值设定',
          list: [
            {
              type: 'el-switch',
              label: '显示',
              name: 'isShowBar',
              required: false,
              placeholder: '',
              value: false
            },
            {
              type: 'el-input-number',
              label: '距离',
              name: 'distanceBar',
              required: false,
              placeholder: '',
              value: 5
            },
            {
              type: 'el-input-number',
              label: '字体字号',
              name: 'fontSizeBar',
              required: false,
              placeholder: '',
              value: 14
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'subTextColorBar',
              required: false,
              placeholder: '',
              value: '#fff'
            },
            {
              type: 'el-select',
              label: '字体粗细',
              name: 'fontWeightBar',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'normal', name: '正常'},
                {code: 'bold', name: '粗体'},
                {code: 'bolder', name: '特粗体'},
                {code: 'lighter', name: '细体'}
              ],
              value: 'normal'
            },
          ],
        },
        {
          name: '提示语设置',
          list: [
            {
              type: 'el-input-number',
              label: '字体大小',
              name: 'tipFontSize',
              required: false,
              placeholder: '',
              value: 12
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'lineColor',
              required: false,
              placeholder: '',
              value: '#e68b55'
            },
          ],
        },
        {
          name: '坐标轴边距设置',
          list: [
            {
              type: 'el-slider',
              label: '左边距(像素)',
              name: 'marginLeft',
              required: false,
              placeholder: '',
              value: 10,
            }, {
              type: 'el-slider',
              label: '顶边距(像素)',
              name: 'marginTop',
              required: false,
              placeholder: '',
              value: 50,
            }, {
              type: 'el-slider',
              label: '右边距(像素)',
              name: 'marginRight',
              required: false,
              placeholder: '',
              value: 40,
            }, {
              type: 'el-slider',
              label: '底边距(像素)',
              name: 'marginBottom',
              required: false,
              placeholder: '',
              value: 10,
            },
          ],
        },
        {
          name: '图例操作',
          list: [
            {
              type: 'el-switch',
              label: '图例',
              name: 'isShowLegend',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'lengedColor',
              required: false,
              placeholder: '',
              value: '#fff',
            },
            {
              type: 'el-input-number',
              label: '字体字号',
              name: 'lengedFontSize',
              required: false,
              placeholder: '',
              value: 16,
            },
            {
              type: 'el-input-number',
              label: '图例宽度',
              name: 'lengedWidth',
              required: false,
              placeholder: '',
              value: 15,
            },
            {
              type: 'el-select',
              label: '横向位置',
              name: 'lateralPosition',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'center', name: '居中'},
                {code: 'left', name: '左对齐'},
                {code: 'right', name: '右对齐'},
              ],
              value: 'center'
            },
            {
              type: 'el-select',
              label: '纵向位置',
              name: 'longitudinalPosition',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'top', name: '顶部'},
                {code: 'bottom', name: '底部'},
              ],
              value: 'top'
            },
            {
              type: 'el-select',
              label: '布局前置',
              name: 'layoutFront',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'horizontal', name: '横排'},
                {code: 'vertical', name: '竖排'},
              ],
              value: 'horizontal'
            },
          ],
        },
        {
          name: '自定义配色',
          list: [
            {
              type: 'customColor',
              label: '',
              name: 'customColor',
              required: false,
              value: [{color: '#00F4FFFF'}, {color: '#e68b55'}],
            },
          ],
        },
      ],
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
        value: '30vh',
      },
    ]
  }
}

type OptionType = any

@Component({
  components: {
    BarLine,
  }
})
class BarLineParse extends Vue {

  static options: OptionType = options

  // 静态数据
  staticDataFn (optionsData, option) {
    const axis = []
    const data = {}
    optionsData.staticData.forEach((item, index) => {
      axis[index] = item.name
      Object.keys(item).forEach(key => {
        if (!data[key]) {
          data[key] = []
        }
        data[key][index] = item[key]
      })
    })
    option.xAxis.data = axis;
    option.series.forEach(item => {
      item.data = data[item.alias]
    })
  }

  // 动态获取数据
  async dynamicDataFn (optionsData, option) {
    // option.series = []
    const res = await axios.get(`http://127.0.0.1:8360/api/v1/index/test`)
    const axis = []
    const data = {}
    res.data.data.forEach((item, index) => {
      axis[index] = item.name
      Object.keys(item).forEach(key => {
        if (!data[key]) {
          data[key] = []
        }
        data[key][index] = item[key]
      })
    })
    option.xAxis.data = axis;
    option.series.forEach(item => {
      item.data = data[item.alias]
    })
    // const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.fetchChartData(optionsData.api)
    // console.log({ code, data, message })
  }

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const optionsConfig: any = options.config;
    const optionsData: any = options.data;
    const option: any = {
      color: ['#0cf9ff', '#0cf9ff', '#fff'],
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
        },
        {
          type: 'value',
          position: 'right',
        }
      ],
      legend: {
        data: ['蒸发量' , '上牌量', '降水量']
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          name: '上牌量',
          type: 'bar',
          alias: 'bar1',
          yAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: '#0c1022'
          },
        },
        {
          data: [10, 20, 50, 80, 170, 180, 30],
          name: '蒸发量',
          type: 'bar',
          alias: 'bar2',
          yAxisIndex: 0,
          showBackground: false,
          backgroundStyle: {
            color: '#0c1022'
          },
          itemStyle: {
            color: '#ff5a5a'
          }
        },
        {
          name: '降水量',
          type: 'line',
          alias: 'line1',
          yAxisIndex: 1,
          lineStyle: {
            color: '#ffc148'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(58,77,233,0.8)'
            }, {
              offset: 1,
              color: 'rgba(58,77,233,0.3)'
            }])
          },
          data: [20, 20, 50, 80, 70, 10, 30],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#ffc148'
            },
          },
        }
      ]
    }
    // @ts-ignore
    option.title = setOptionsTitle(optionsConfig)
    // @ts-ignore
    option.xAxis = { ...option.xAxis, ...setOptionsX(optionsConfig) }
    // @ts-ignore
    option.yAxis = setOptionsY(optionsConfig)
    // @ts-ignore
    option.series = setOptionsTop(optionsConfig, option.series)
    // @ts-ignore
    option.series = setOptionsBar(optionsConfig, option.series)
    // @ts-ignore
    option.legend = setOptionsLegend(optionsConfig, option.legend)
    // @ts-ignore
    option.tooltip = setOptionsTooltip(optionsConfig)
    // @ts-ignore
    option.grid = setOptionsMargin(optionsConfig)
    if (optionsData.dataType === 'staticData') {
      // @ts-ignore
      this.methods.staticDataFn(optionsData, option)
    }
    if (optionsData.dataType === 'dynamicData') {
      // @ts-ignore
      this.methods.dynamicDataFn(optionsData, option)
    }
    console.log({option})
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'BarLineParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      },
      props: {
        option: option,
        cssStyle: options.cssStyle,
        // title: section.section.options.title,
      }
    }
    
    return (
      // @ts-ignore
      <BarLine
        { ..._propsOn }
      ></BarLine>
    )
  }
}

// @ts-ignore
BarLineParse.des = '混合图'
// @ts-ignore
BarLineParse.icon = 'lx-icon-data'

export default BarLineParse
