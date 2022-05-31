<template>
  <div
    class="vertical-container"
    @dragover.prevent
    @drop.stop="handleDrop"
    :style="{...cssStyle}"
  >
    <slot></slot>
  </div>
</template>

<script>
// 默认输入组件
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VerticalContainer extends Vue{
  @Prop({default: () => ({})}) cssStyle
}
</script>

<style scoped>
.vertical-container {
  width: 33.3vw;
  height: calc(100vh - 205px);
  min-height: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
