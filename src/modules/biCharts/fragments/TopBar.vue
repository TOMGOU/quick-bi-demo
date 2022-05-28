<template>
  <section class="top-bar">
    <div>顶栏</div>
    <el-button
      class="top-bar__full-screen"
      @click="handleFullScreen"
      type="primary"
    >
      <i class="lx-icon-full-screen top-bar__icon" ></i>
      全屏预览
    </el-button>
  </section>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ConfigPanel extends Vue {
  handleFullScreen () {
    // TODO: 全屏预览功能
    console.log('全屏预览')
    this.$emit('handleFullScreen')
  }
}
</script>
<style lang="less">
  .top-bar {
    position: relative;
    padding: 10px;
    border: 1px dotted #eee;
    font-size: 26px;
    font-weight: bold;

    &__full-screen {
      position: absolute;
      top: 0;
      right: 50px;
      font-size: 16px;
    }

    &__icon {
      font-size: 14px;
      margin-right: 10px;

      &:before {
        color: #fff;
      }
    }
  }
</style>