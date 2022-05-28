<template>
  <div class="pie-box" :style="cssStyle">
    <chart class="pie" ref="pieChart" :option="option" :theme="theme" autoresize></chart>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'

@Component({
  components: {
    chart: eCharts,
  }
})
export default class Pie extends Vue {
  @Prop({ default: () => ({}) }) readonly cssStyle: any
  @Prop({ default: () => ({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // orient: 'horizontal',
      top: '44%',
      left: '83%',
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
        type: 'gauge',
        center: ['25%', '60%'],
        radius: '70%',
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
      {
        name: '争议订单',
        type: 'pie',
        center: ['68%', '60%'],
        radius: ['35%', '70%'],
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
  }) }) readonly option: any
  private theme = require('../../theme/index.json')

  @Watch('option', { immediate: true, deep: true })
  handleSetOption () {
    // @ts-ignore
    this.$refs.pieChart && this.$refs.pieChart.setOption(this.option, true)
  }
}
</script>

<style lang="less" scoped>
.pie-box {
  position: relative;
  width: 50%;
  height: 100%;
}

.pie {
  width: 90%;
  height: 95%;
}
</style>
