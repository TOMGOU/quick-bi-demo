<template>
  <div
    class="vertical-container"
    @dragover.prevent
    @drop.stop="handleDrop"
    :style="{...jsonSchema.option.cssStyle}"
  >
    <slot></slot>
  </div>
</template>

<script>
// 默认输入组件
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class VerticalContainer extends Vue{
  @Prop({default: () => ({})}) jsonSchema

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style scoped>
.vertical-container {
  border: 1px solid yellowgreen;
  background-color: #eee;
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
