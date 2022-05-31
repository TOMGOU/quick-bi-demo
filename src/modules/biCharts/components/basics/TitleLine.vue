<template>
  <div class="title-line" :style="{...cssStyle}">
    {{ title }}
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleLine extends Vue {
  @Prop({default: '日拍趋势图'}) readonly title: string
  @Prop({default: () => ({})}) readonly cssStyle: any
}
</script>

<style lang="less" scoped>
.title-line {
  display: inline-block;
  position: relative;
  height: 20px;
  font-size: 14px;
  color: #fff;
  padding: 2px;
  font-weight: bold;
  margin-left: 10px;

  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 5px;
    background-color: #0cf9ff;
    opacity: 0.6;
    bottom: 1px;
    left: 0;
  }
}
</style>
