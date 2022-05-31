<template>
  <div class="bar-line-box">
    <slot name='top' />
    <chart-box
      class='multi-charts'
      :title="title"
      :css-style='cssStyle'
      :mask-style='maskStyle'
    >
      <div class='multi-charts__box' :style='boxStyle'>
        <chart
          v-for='(item, index) in options'
          class="bar-line"
          ref="barLineChart"
          :option="item"
          :theme="theme"
          :loading="loading"
          :key='index'
          autoresize
        />
        <slot name='others' />
      </div>
    </chart-box>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChartBox from './ChartBox.vue'
import eCharts from 'vue-echarts'

@Component({
  components: {
    chart: eCharts,
    ChartBox
  }
})
export default class MultiCharts extends Vue {
  @Prop({ default: () => []}) readonly options: Array<any>
  @Prop({default: '日拍卖趋势图'}) readonly title: string
  @Prop({default: () => ({}) }) readonly cssStyle: any
  @Prop({default: () => ({}) }) readonly maskStyle: any
  @Prop({default: () => ({}) }) readonly boxStyle: any
  @Prop({default: true}) readonly loading: boolean
  private theme = require('../theme/index.json')
}
</script>

<style lang="less" scoped>
.bar-line-box {
  position: relative;

  .multi-charts {
    &__box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: 100%;
    }
  }
}

.bar-line {
  width: 90%;
  height: 95%;
}
</style>
