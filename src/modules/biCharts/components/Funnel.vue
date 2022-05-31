<template>
  <div class="funnel-box">
    <chart-box
      :title="title"
      :css-style='cssStyle'
    >
      <div class='funnel-box__config'>
        <div
          v-for='item in carDealerTypes'
          :key='item.name'
          class='funnel-box__config__item'
        >
          <div class='color-block' :style='{ background: item.color }' />
          <div class='name'>{{ item.name }}</div>
        </div>
      </div>
     <div class='funnel-box__chart'>
       <div class='funnel-box__chart__top'>
         <div
           v-for='item in carDealerTitles'
           :key='item'
           class='title'
         >
           {{ item }}
         </div>
       </div>
       <chart
         autoresize
         class="funnel"
         ref="funnelChart"
         :option="option"
         :theme="theme"
         :loading="loading"
       />
     </div>
    </chart-box>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import ChartBox from './ChartBox.vue'
import eCharts from 'vue-echarts'
import {carDealerOptions, carDealerTitles, carDealerTypes} from '@/modules/biCharts/configs/carDealer/funnel';

@Component({
  components: {
    chart: eCharts,
    ChartBox
  }
})
export default class Funnel extends Vue {
  @Prop({ default: () => carDealerOptions}) readonly option: Array<any>
  @Prop({default: '日拍卖趋势图'}) readonly title: string
  @Prop({default: true}) readonly loading: boolean
  @Prop({default: () => {}}) readonly cssStyle: any
  private theme = require('../theme/index.json')

  carDealerTypes = carDealerTypes
  carDealerTitles = carDealerTitles
}
</script>

<style lang="less" scoped>
.funnel-box {
  position: relative;

  &__config {
    padding: 30px 0 0 5%;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;

    &__item {
      margin-bottom: 12%;
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }

      .color-block {
        width: 10px;
        height: 10px;
      }

      .name {
        margin-left: 10px;
        color: #fff;
      }
    }
  }
  &__chart {
    flex: 1;
    height: 100%;
    padding-top: 30px;

    &__top {
      display: flex;
      justify-content: space-between;
      padding-left: 10%;
      .title {
        color: #fff;
        font-size: 14px;
        &:last-child {
          padding-right: 20%;
        }
      }
    }
  }
}

.funnel {
  width: 90%;
  height: 95%;
}
</style>
