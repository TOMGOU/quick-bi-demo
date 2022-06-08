<template>
  <section
    class="chart-box"
    :style="{...cssStyle}"
    @dragover.prevent
    @drop.stop="handleDrop"
  >
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
  @Prop({default: () => ({})}) readonly cssStyle: any
  @Prop({default: () => ({})}) jsonSchema

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style lang="less" scoped>
.chart-box {
  height: calc((100vh - 165px) / 3);
  margin: auto;

  &__mask{
    position: relative;
    width: 100%;
    height: 80%;
    background: #100B2A url(../../../../assets/styles/images/chart-container.png) center no-repeat;
    background-size: 95% 100%;
    display: flex;
    justify-content: center;
    align-items:center;
  }

  &__title {
    height: 20%;
    display: flex;
    align-items: center; 
    font-size: 20px;
    color: #0cf9ff;
    padding-left: 50px;
    vertical-align: middle;
    font-weight: bold;
    text-align: left;
  }

  &__icon {
    margin-top: -3px;
    margin-right: 5px;
    vertical-align: middle;
  }
}
</style>