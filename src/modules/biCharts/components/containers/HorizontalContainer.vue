<template>
  <div
    class="horizontal-container"
    @dragover.prevent @drop.stop="handleDrop"
    :style="{...jsonSchema.option.cssStyle}"
  >
    <slot></slot>
  </div>
</template>

<script>
// 默认输入组件
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HorizontalContainer extends Vue{
  @Prop({default: () => ({})}) jsonSchema

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style scoped>
.horizontal-container {
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
