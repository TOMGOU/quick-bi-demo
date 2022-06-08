<template>
  <div
    class="vertical-container"
    @dragover.prevent
    @drop.stop="handleDrop"
    :style="cssStyle"
  >
    <draggable v-model="jsonSchema.children">
      <slot></slot>
    </draggable>
    <!-- <avue-draggable>
      <slot></slot>
    </avue-draggable> -->
  </div>
</template>

<script>
// 默认输入组件
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable'

@Component({
  components: {
    draggable
  }
})
export default class VerticalContainer extends Vue{
  @Prop({default: () => ({})}) jsonSchema
  @Prop({default: () => ({})}) cssStyle

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style scoped>
.vertical-container {
  position: relative;
  width: 33.3vw;
  height: calc(100vh - 110px);
  background: #0c1022;
  min-height: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
