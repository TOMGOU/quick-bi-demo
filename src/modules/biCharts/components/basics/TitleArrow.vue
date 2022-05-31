<template>
  <div class="title-arrow" :style="{...cssStyle}">
    <i class="lx-icon-d-arrow-right title-arrow__icon"></i>
    {{ title }}
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleArrow extends Vue {
  @Prop({default: '日拍趋势图'}) readonly title: string
  @Prop({default: () => ({})}) readonly cssStyle: any
}
</script>

<style lang="less" scoped>
.title-arrow {
  height: 55px;
  font-size: 20px;
  color: #0cf9ff;
  padding-left: 20px;
  vertical-align: middle;
  font-weight: bold;

  &__icon {
    margin-top: -3px;
    line-height: 58px;
    vertical-align: middle;
  }
}
</style>
