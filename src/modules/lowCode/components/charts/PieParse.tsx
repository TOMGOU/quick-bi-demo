import { Component, Vue } from 'vue-property-decorator';
import Pie from './Pie.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'
const axios = require('axios');

const options = {
  code: 'pieChart',
  type: 'chart',
  label: '饼图',
  icon: 'lx-icon-data',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '饼图',
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
            // {
            //   type: 'el-slider',
            //   label: '圆角',
            //   name: 'radius',
            //   require: false,
            //   placeholder: '',
            //   value: 5,
            // },
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
              value: false
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
        value: [{
          value: 70,
          name: '关单率',
        }]
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '图表宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '100%',
      },
      {
        type: 'el-input-text',
        label: '图表高度',
        name: 'height',
        required: false,
        placeholder: '',
        value: '100%',
      },
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

  static options: OptionType = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // orient: 'horizontal',
        top: '35%',
        left: '70%',
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
        // option: section.section.option.option,
        // cssStyle: section.section.option.cssStyle,
        option: option,
        cssStyle: options.cssStyle,
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
PieParse.key = 'PieParse'
// @ts-ignore
PieParse.des = '饼图'
// @ts-ignore
PieParse.icon = 'lx-icon-setting'

export default PieParse
