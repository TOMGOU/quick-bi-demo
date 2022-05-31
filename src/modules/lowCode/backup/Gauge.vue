<template>
  <div class="gauge-box" :style="cssStyle">
    <chart class="gauge" ref="gaugeChart" :option="option" :theme="theme" autoresize></chart>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'

@Component({
  components: {
    chart: eCharts
  }
})
export default class Gauge extends Vue {
  @Prop({ default: () => ({}) }) readonly cssStyle: any
  @Prop({ default: () => ({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#0CF9FF'],
              [0.7, '#4992ff'],
              [1, '#ff5a5a']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -15,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          distance: -15,
          length: 15,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 20,
          fontSize: 6
        },
        title: {
          show : true,
          offsetCenter: [0, '75%'],
          textStyle: {
            fontSize: 12,
            color: '#ff5a5a'
          }
        },
        detail: {
          valueAnimation: true,
          formatter: value => value === 0 ? `${value}%` : `${value.toFixed(1)}%`,
          textStyle:{
            fontSize: 12,
            color: '#ff5a5a'
          },
          offsetCenter: [0, "50%"],
        },
        data: [{
          value: 70,
          name: '关单率',
        }]
      },
    ]
  }) }) readonly option: any
  private theme = require('../../theme/index.json')

  @Watch('option', { immediate: true, deep: true })
  handleSetOption () {
    // @ts-ignore
    this.$refs.gaugeChart && this.$refs.gaugeChart.setOption(this.option, true)
  }
}
</script>

<style lang="less" scoped>
.gauge-box {
  position: relative;
  width: 50%;
  height: 100%;
}

.gauge {
  width: 90%;
  height: 95%;
}
</style>
