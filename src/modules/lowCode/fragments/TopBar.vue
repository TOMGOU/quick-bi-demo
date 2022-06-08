<template>
  <section class="top-bar">
    <div>Low-Code 配置面板</div>
    <div class="top-bar__button-box">
      <el-button
        class="top-bar__full-screen"
        @click="handleFullScreen"
        type="primary"
      >
        <i class="lx-icon-full-screen top-bar__icon" ></i>
        全屏预览
      </el-button>
      <el-button
        class="top-bar__save"
        @click="handleSave"
        type="primary"
      >
        <i class="lx-icon-save top-bar__icon" ></i>
        保存
      </el-button>
    </div>
  </section>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ConfigPanel extends Vue {
  handleFullScreen () {
    // TODO: 全屏预览功能
    this.$emit('handleFullScreen')
  }
  handleSave () {
    this.$emit('handleSave')
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

    &__button-box {
      position: absolute;
      top: 0;
      right: 50px;
      font-size: 16px;
      display: flex;
    }

    &__full-screen {
      // position: absolute;
      // top: 0;
      // right: 50px;
      // font-size: 16px;
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