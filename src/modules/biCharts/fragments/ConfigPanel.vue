<template>
  <section class="config-panel">
    <h3 class="config-panel__title">配置面板</h3>
    <div class="config-panel__tyle">选中类型: {{ selectedType }}</div>
    <div class="config-panel__uuid">uuid: {{ uuid }}</div>
    <div class="config-panel__operate" v-if="jsonSchema && jsonSchema.children && jsonSchema.children.length">
      组件操作：
      <el-button
        @click="handleDelete"
        type="danger"
      >删除选中组件</el-button>
    </div>
    <div class="config-panel__operate" v-if="selectedType === 'BarLineParse'">
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
    ></vue-json-editor>
  </section>
</template>
<script>
import { components, parsers } from '../components'
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class'
import store from '@/vuex/store'
import { Divider } from 'element-ui';
import vueJsonEditor from 'vue-json-editor'
import * as echarts from 'echarts'

const biCharts = namespace('biCharts')

@Component({
  components: {
    ...components,
    vueJsonEditor
  },
})
export default class ConfigPanel extends Vue {
  @biCharts.Action('setSelectedType') setSelectedType
  @biCharts.State('selectedType') selectedType
  @biCharts.State('uuid') uuid

  @PropSync('jsonSchema', { type: Object }) syncedJsonSchema

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

  reset () {
    store.dispatch('biCharts/setSelectedType', {
      selectedType: 'VerticalContainerParse'
    })
    store.dispatch('biCharts/setUuid', {
      uuid: '',
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

  handleJsonSave (value) {
    // TODO 将配置数据通过接口 post 给后台
    console.log({ value: this.jsonSchema })
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
    if (uuid === undefined) return ''
    if (uuid && uuid === json.uuid) {
      this.option = json.option
    }
    if (json.children) {
      this.recursion(json.children, uuid)
    }
  }
}
</script>
<style lang="less">
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
  }
</style>