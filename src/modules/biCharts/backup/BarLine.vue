<template>
  <div class="bar-line-box" :style="cssStyle">
    <slot></slot>
    <chart-box :title="title" :cssStyle="cssStyle">
      <chart class="bar-line" ref="barLineChart" :option="option" :theme="theme" autoresize></chart>
    </chart-box>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ChartBox from '../containers/ChartBox.vue'
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'

@Component({
  components: {
    chart: eCharts,
    ChartBox
  }
})
export default class BarLine extends Vue {
  @Prop({ default: () => ({
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
      data: ['蒸发量', '降水量', '上牌量']
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        name: '上牌量',
        type: 'bar',
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
        yAxisIndex: 1,
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
  }) }) readonly option: any
  @Prop({ default: () => ({}) }) readonly cssStyle: any
  @Prop({default: '日拍趋势图'}) readonly title: string
  private theme = require('../../theme/index.json')

  @Watch('option', { immediate: true, deep: true })
  handleSetOption () {
    // @ts-ignore
    this.$refs.barLineChart && this.$refs.barLineChart.setOption(this.option, true)
  }
}
</script>

<style lang="less" scoped>
.bar-line-box {
  position: relative;
}

.bar-line {
  width: 90%;
  height: 95%;
}
</style>
