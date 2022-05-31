<template>
  <section class="chart-box" :style="{...cssStyle}">
    <!-- <div class="chart-box__title">
      <i class="lx-icon-d-arrow-right chart-box__icon"></i>
      {{ title }}
    </div> -->
    <title-arrow :title="title" :cssStyle="titleStyle"></title-arrow>
      <div class="chart-box__mask" :style="{backgroundImage: 'url(' + bgImg + ')', ...maskStyle}">
      <!-- <div class="chart-box__mask"> -->
      <slot></slot>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitleArrow from './basics/TitleArrow.vue'

@Component({
  components: {
    TitleArrow
  }
})
export default class ChartBox extends Vue {
  @Prop({default: require('../../../assets/styles/images/chart-container.png')}) readonly bgImg: string
  @Prop({default: '日拍趋势图'}) readonly title: string
  @Prop({default: () => ({})}) readonly cssStyle: any
  @Prop({default: () => ({})}) readonly maskStyle: any
  @Prop({default: () => ({})}) readonly titleStyle: any
}
</script>

<style lang="less" scoped>
.chart-box {
  height: calc((100vh - 165px) / 3);

  &__mask{
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    background-color: #100B2A;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 96% 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    margin: 5px;
  }

  &__title {
    height: 55px;
    font-size: 20px;
    color: #0cf9ff;
    padding-left: 50px;
    vertical-align: middle;
    font-weight: bold;
  }

  &__icon {
    margin-top: -3px;
    vertical-align: middle;
  }
}
</style>
