<template>
  <section class="config-panel">
    <!-- <h3 class="config-panel__title">配置面板</h3>
    <div class="config-panel__tyle">选中类型: {{ selectedType }}</div>
    <div class="config-panel__uuid">uuid: {{ uuid }}</div>
    <div class="config-panel__operate" v-if="jsonSchema && jsonSchema.children && jsonSchema.children.length">
      组件操作：
      <el-button
        @click="handleDelete"
        type="danger"
      >删除选中组件</el-button>
    </div>
    <div class="config-panel__operate" v-if="['BarLineParse', 'BarLinesParse'].includes(selectedType)">
      数据操作：
      <el-button
        @click="handleAddBar"
        type="primary"
      >添加柱状图</el-button>
      <el-button
        @click="handleAddLine"
        type="primary"
      >添加折线图</el-button>
      <el-button
        @click="handleDeleteLast"
        type="primary"
      >删除最后一项</el-button>
    </div>
    <vue-json-editor
      :show-btns="true"
      :expandedOnStart="true"
      v-model="option"
      @json-change="handleJsonChange"
      @json-save="handleJsonSave"
    ></vue-json-editor> -->
    <div class="config-panel__operate" v-if="jsonSchema && jsonSchema.children && jsonSchema.children.length">
      组件操作：
      <el-button
        @click="handleDelete"
        type="danger"
      >删除选中组件</el-button>
    </div>

    <el-tabs v-if="option.options" v-model="activeName" type="border-card" :stretch="true">
      <el-tab-pane
        name="first"
        label="配置"
        v-if="option.options.config"
      >
        <dynamic-form
          ref="formData"
          :options="option.options.config"
          @onChanged="val => widgetValueChanged('config', val)"
        />
      </el-tab-pane>
      <el-tab-pane
        name="second"
        label="数据"
        v-if="option.options.data"
      >
        <dynamicForm
          ref="formData"
          :options="option.options.data"
          @onChanged="val => widgetValueChanged('data', val)"
        />
      </el-tab-pane>
      <el-tab-pane
        name="third"
        label="其他"
        v-if="option.options.cssStyle"
      >
        <dynamicForm
          ref="formData"
          :options="option.options.cssStyle"
          @onChanged="val => widgetValueChanged('cssStyle', val)"
        />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
import { components, parsers } from '../components'
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class'
import store from '@/vuex/store'
import { Divider } from 'element-ui';
import vueJsonEditor from 'vue-json-editor'
import DynamicForm from './components/DynamicForm.vue'
import * as echarts from 'echarts'

const biCharts = namespace('biCharts')

@Component({
  components: {
    ...components,
    vueJsonEditor,
    DynamicForm
  },
})
export default class ConfigPanel extends Vue {
  @biCharts.Action('setSelectedType') setSelectedType
  @biCharts.State('selectedType') selectedType
  @biCharts.State('uuid') uuid

  @PropSync('jsonSchema', { type: Object }) syncedJsonSchema

  activeName = 'first'

  widgetOptions = {
    config: [
      {
        type: 'el-input-text',
        label: '图表名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '饼图',
      },
      {
        type: 'vue-color',
        label: '背景颜色',
        name: 'background',
        required: false,
        placeholder: '',
        value: ''
      },
      {
        type: 'el-select',
        label: '饼图样式',
        name: 'piechartStyle',
        required: false,
        placeholder: '',
        selectOptions: [
          {code: 'shixin', name: '实心饼图'},
          {code: 'kongxin', name: '空心饼图'},
        ],
        value: 'shixin'
      },
      [
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
              value: ''
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
              value: 12
            },
          ],
        },
        {
          name: '数值设定',
          list: [
            {
              type: 'el-switch',
              label: '显示',
              name: 'isShow',
              required: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-switch',
              label: '数值',
              name: 'numberValue',
              require: false,
              placeholder: '',
              value: true,
            },
            {
              type: 'el-switch',
              label: '百分比',
              name: 'percentage',
              require: false,
              placeholder: '',
              value: false,
            },
            {
              type: 'el-input-number',
              label: '字体大小',
              name: 'fontSize',
              required: false,
              placeholder: '',
              value: 14,
            },
            {
              type: 'vue-color',
              label: '字体颜色',
              name: 'subTextColor',
              required: false,
              placeholder: '',
              value: ''
            },
            {
              type: 'el-select',
              label: '字体粗细',
              name: 'fontWeight',
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
              name: 'fontSize',
              required: false,
              placeholder: '',
              value: 12
            },
            {
              type: 'vue-color',
              label: '网格线颜色',
              name: 'lineColor',
              required: false,
              placeholder: '',
              value: ''
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
              type: 'el-input-text',
              label: '字体大小',
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
                {code: 'left', name: '左对齐'},
                {code: 'right', name: '右对齐'},
              ],
              value: ''
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
              value: ''
            },
            {
              type: 'el-select',
              label: '布局前置',
              name: 'layoutFront',
              required: false,
              placeholder: '',
              selectOptions: [
                {code: 'vertical', name: '竖排'},
                {code: 'horizontal', name: '横排'},
              ],
              value: ''
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
              value: [{color: '#0CD2E6'}, {color: '#00BFA5'}, {color: '#FFC722'}, {color: '#886EFF'}, {color: '#008DEC'}],
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
        relactiveDom: 'dataType',
        relactiveDomValue: 'dynamicData',
        value: 5000
      },
      {
        type: 'el-input-text',
        label: '接口地址',
        name: 'api',
        relactiveDom: 'dataType',
        relactiveDomValue: 'dynamicData',
        value: 'api/v1/...'
      },
      {
        type: 'el-button',
        label: '静态数据',
        name: 'staticData',
        required: false,
        placeholder: '',
        relactiveDom: 'dataType',
        relactiveDomValue: 'staticData',
        value: [{"value": 1048,"name": "搜索引擎"},{"value": 735, "name": "直接访问"},{"value": 580, "name": "邮件营销"},{"value": 484,"name":"联盟广告"},{"value":300,"name":"视频广告"}]
      },
      // {
      //   type: 'dycustComponents',
      //   label: '',
      //   name: 'dynamicData',
      //   required: false,
      //   placeholder: '',
      //   relactiveDom: 'dataType',
      //   chartType: 'widget-piechart',
      //   relactiveDomValue: 'dynamicData',
      //   dictKey: 'PIE_PROPERTIES',
      //   value: '',
      // },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '图表宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '100vw',
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
  // 配置面板展示当前选中数据
  option = {}

  // 用于修改 jsonSchema 数据
  parent = {}

  @Watch('uuid')
  onChildChanged(val) {
    this.getCurrentConfig(this.jsonSchema, val)
  }

  @Watch('option', { immediate: true, deep: true })
  onOptionChanged(val) {
    this.parent.option = val
  }

  mounted () {
    this.reset()
  }

  widgetValueChanged (key, val) {
    this.setDefaultValue(this.option.options[key], val);
  }

  setDefaultValue(options, val) {
    for (let i = 0; i < options.length; i++) {
      if (Object.prototype.toString.call(options[i]) == "[object Object]") {
        for (const k in val) {
          if (options[i].name == k) {
            options[i].value = val[k];
          }
        }
      } else if (
        Object.prototype.toString.call(options[i]) == "[object Array]"
      ) {
        for (let j = 0; j < options[i].length; j++) {
          const list = options[i][j].list;
          for (let z = 0; z < list.length; z++) {
            for (const k in val) {
              if (list[z].name == k) {
                list[z].value = val[k];
              }
            }
          }
        }
      }
    }
  }

  reset () {
    store.dispatch('biCharts/setSelectedType', {
      selectedType: 'RootContainerParse'
    })
    store.dispatch('biCharts/setUuid', {
      uuid: 'root',
    })
    this.option = {}
  }

  recur (children, uuid) {
    if (children === undefined) return
    children.forEach((item, index) => {
      if (item.uuid === uuid) {
        children.splice(index, 1)
      } else {
        this.recur(item.children, uuid)
      }
    })
  }

  handleDelete () {
    this.recur(this.jsonSchema.children, this.uuid)
    this.reset()
  }

  // 十六进制颜色随机
  handleGenerateColor () {
    var r = Math.floor(Math.random() * 156) + 100
    var g = Math.floor(Math.random() * 156) + 100
    var b = Math.floor(Math.random() * 156) + 100
    var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
    return color
  }

  handleAddBar () {
    this.option.option.legend.data.push('新指标-bar')
    this.option.option.series.push({
      data: [100, 50, 150, 180, 170, 180, 30],
      name: '新指标-bar',
      type: 'bar',
      barWidth: '20%',
      yAxisIndex: 0,
      showBackground: false,
      backgroundStyle: {
        color: 'rgba(12, 249, 255, 0)'
      },
      itemStyle: {
        color: this.handleGenerateColor()
      }
    })
  }

  handleAddLine () {
    const color = this.handleGenerateColor()
    this.option.option.legend.data.push('新指标-line')
    this.option.option.series.push({
      name: '新指标-line',
      type: 'line',
      symbolSize: 6,
      smooth: false,
      symbol: 'emptyCircle',
      color: [color],
      yAxisIndex: 1,
      lineStyle: {
        color: color,
        type: 'solid'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(255, 193, 72, 0.3)'
        }, {
          offset: 1,
          color: 'rgba(255, 193, 72, 0.1)'
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
          color: color
        },
      },
    })
  }

  handleDeleteLast () {
    this.option.option.legend.data.pop()
    this.option.option.series.pop()
  }

  handleJsonChange (value) {
    // console.log({value})
    // this.syncedJsonSchema = value
  }

  async handleJsonSave (value) {
    // TODO 将配置数据通过接口 post 给后台
    const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.postChartsConfig({ data: JSON.stringify(this.jsonSchema) }) || {}
    console.log({ id: data.id, value: this.jsonSchema })
  }

  recursion (children, uuid) {
    if (children === undefined) return
    children.forEach((item, index) => {
      if (item.uuid === uuid) {
        // 隔断引用类型数据，避免修改到所有的图表数据
        this.option = JSON.parse(JSON.stringify(item.option))
        this.parent = children[index]
      } else {
        this.recursion(item.children, uuid)
      }
    })
  }

  getCurrentConfig (json, uuid) {
    if (uuid === 'root') return ''
    
    if (uuid === json.uuid) {
      this.option = json.option
    }

    if (json.children) {
      this.recursion(json.children, uuid)
    }
  }
}
</script>
<style lang="less" scoped>
  .config-panel {
    max-height: 85vh;
    overflow: scroll;

    &__title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__type, &__uuid {
      line-height: 30px;
    }

    &__operate {
      margin: 10px 0;
    }
    
    &::-webkit-scrollbar {
      width: 0 !important;
    }

    /deep/ .el-tabs--border-card {
      border: 0;

      .el-tabs__header {
        .el-tabs__nav {
          .el-tabs__item {
            background-color: #fff;
            border: 0px;
          }

          .el-tabs__item.is-active {
            background-color: #eee;
          }
        }
      }

      .el-tabs__content {
        background-color: #fff;
        height: calc(100vh - 39px);
        overflow-x: hidden;
        overflow-y: auto;

        .el-tab-pane {
          color: #bfcbd9;
        }

        &::-webkit-scrollbar {
          width: 5px;
          height: 14px;
        }

        &::-webkit-scrollbar-track,
        &::-webkit-scrollbar-thumb {
          border-radius: 1px;
          border: 0 solid transparent;
        }

        &::-webkit-scrollbar-track-piece {
          /*修改滚动条的背景和圆角*/
          background: #29405c;
          -webkit-border-radius: 7px;
        }

        &::-webkit-scrollbar-track {
          box-shadow: 1px 1px 5px rgba(116, 148, 170, 0.5) inset;
        }

        &::-webkit-scrollbar-thumb {
          min-height: 20px;
          background-clip: content-box;
          box-shadow: 0 0 0 5px rgba(116, 148, 170, 0.5) inset;
        }

        &::-webkit-scrollbar-corner {
          background: transparent;
        }

        /*修改垂直滚动条的样式*/
        &::-webkit-scrollbar-thumb:vertical {
          background-color: #00113a;
          -webkit-border-radius: 7px;
        }

        /*修改水平滚动条的样式*/
        &::-webkit-scrollbar-thumb:horizontal {
          background-color: #00113a;
          -webkit-border-radius: 7px;
        }
      }
    }
  }
</style>