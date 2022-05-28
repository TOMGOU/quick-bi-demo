<template>
  <div
    class="root-container"
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
export default class RootContainer extends Vue{
  @Prop({default: () => ({})}) jsonSchema

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style scoped>
.root-container {
  background-color: #0c1022;
  width: 100vw;
  height: 100vh;
}
</style>
