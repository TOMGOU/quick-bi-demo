<template>
  <div class="color-picker">
    <el-input
      clearable
      v-model="colorValue"
      placeholder="请输入颜色"
      size="mini"
      @change="changeColor"
    >
      <template slot="append">
        <el-color-picker
          v-model="colorValue"
          :predefine="predefineColors"
          show-alpha
          size="mini"
          @change="changeColor"
        />
      </template>
    </el-input>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ColorPicker extends Vue {
  @Prop({ default: () => ('') }) value

  predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
  ]
  colorValue = ''

  @Watch('value', { immediate: true, deep: true })
  handleSetOption (val) {
    this.colorValue = val || ""
  }

  mounted() {
    this.colorValue = this.value;
  }

  changeColor(val) {
    this.colorValue = val || "";
    this.$emit("input", this.colorValue);
    this.$emit("change", this.colorValue);
  }
}
</script>
<style lang="less" scoped>
.color-picker {
  /deep/.el-color-picker--mini, /deep/.el-color-picker--mini .el-color-picker__trigger {
    width: 23px;
    height: 23px;
  }
  /deep/.el-input {
    display: inline-table!important;
  }
  /deep/.el-input-group__append, /deep/.el-input-group__prepend {
    padding: 0;
  }
}
</style>
