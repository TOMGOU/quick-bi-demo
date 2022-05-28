<template>
  <div>
    <el-radio-group
      v-model="current"
      @change="handleButtonClick"
    >
      <el-radio-button
        v-for="item in buttons"
        :key="item.label"
        :label="item.label"
      >
        {{item.text}}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

interface ButtonItem {
  label: string,
  text: string
}

@Component
export default class RadioButtons extends Vue {
  @Prop(String) readonly currBtn: string
  @Prop({default: () => []}) readonly buttons: ButtonItem[]

  current: string | undefined = ""

  @Watch('currBtn')
  onCurrBtnChange(val) {
    this.current = val
  }

  handleButtonClick(label) {
    this.$emit('change', label)
    this.$emit("update:currBtn", label)
  }

}
</script>

<style lang="less">
@import "../assets/styles/base/fn";

.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #fff;
  color: @color-primary;
  border-color: @color-primary;
  box-shadow: 0 0 0 0;
}

.el-radio-button--medium .el-radio-button__inner {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
