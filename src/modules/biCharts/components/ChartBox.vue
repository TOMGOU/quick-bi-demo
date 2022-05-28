<template>
  <section class="chart-box" :style="{...cssStyle}">
    <div class="chart-box__title">
      <i class="lx-icon-d-arrow-right chart-box__icon"></i>
      {{ title }}
    </div>
    <div class="chart-box__mask">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChartBox extends Vue {
  @Prop({default: '日拍趋势图'}) readonly title: string
  @Prop({default: {}}) readonly cssStyle: any
}
</script>

<style lang="less" scoped>
.chart-box {
  // height: 325px;
  height: calc((100vh - 135px) / 3);

  &__mask{
    position: relative;
    width: 100%;
    height: 80%;
    // width: 550px;
    // height: 255px;
    background: #0c1022 url(../../../assets/styles/images/chart-container.png) center no-repeat;
    // background-size: contain;
    background-size: 80% 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    // margin: 5px;
    // &:before {
    //   position: absolute;
    //   content: '';
    //   background: url(../../../assets/styles/images/chart-head.png) center no-repeat;
    //   background-size: 79px 79px;
    //   width: 79px;
    //   height: 79px;
    //   left: 0;
    //   top: 0;
    // }
  }

  &__title {
    text-align: left;
    height: 20%;
    line-height: 58px;
    font-size: 20px;
    color: #0cf9ff;
    padding-left: 50px;
    vertical-align: middle;
  }

  &__icon {
    margin-top: -3px;
    line-height: 58px;
    vertical-align: middle;
  }
}
</style>
