<template>
  <div class="config">
    <!-- 顶栏 -->
    <top-bar v-if="!isFullScreen" @handleFullScreen="handleFullScreen" />
    <!-- 顶栏 -->
    <div class="config__main-content">
      <el-row>
        <el-col :span="2" v-if="!isFullScreen">
          <!-- 物料堆 -->
          <material-stack />
          <!-- 物料堆 -->
        </el-col>
        <el-col :span="isFullScreen ? 24 : 16">
          <!-- 主舞台 -->
          <render-engine ref="engine"
            :jsonSchema.sync="jsonSchema"
          ></render-engine>
          <!-- 主舞台 -->
        </el-col>
        <el-col :span="6" v-if="!isFullScreen">
          <!-- 配置面板 -->
          <div class="config-panel block">
            <config-panel
              :jsonSchema.sync="jsonSchema"
            ></config-panel>
          </div>
          <!-- 配置面板 -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import BarLine from '../biCharts/components/BarLine.vue'
import TopBar from '../biCharts/fragments/TopBar.vue'
import RenderEngine from '../biCharts/fragments/RenderEngine.vue'
import ConfigPanel from '../biCharts/fragments/ConfigPanel.vue'
import MaterialStack from '../biCharts/fragments/MaterialStack.vue'
import * as echarts from 'echarts/core'

@Component({
  components: {
    TopBar,
    RenderEngine,
    ConfigPanel,
    MaterialStack,
  }
})
export default class PublicSession extends Vue {
  @Mutation('UPDATE_NAV') updateNav
  @Mutation('UPDATE_CRUMB') hideCrumb
  // 初始数据
  private jsonSchema: any = {
    type: 'VerticalContainerParse',
    uuid: '',
    option: {}
  }

  private isFullScreen = false

  mounted () {
    window.addEventListener('fullscreenchange', e => {
      this.handleScreenChange()
    })
  }

  /**
   * 页面销毁事件
   */
  destroyed () {
    // 解除全屏监听事件
    window.removeEventListener('fullscreenchange', e => {
      this.handleScreenChange()
    })
  }

  /**
   * 页面全屏事件
   */
  handleFullScreen () {
    if (!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
      const video = document.documentElement as any;
      const rfs = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;
      rfs.call(video);
      this.isFullScreen = true
    } else {
      const rfs = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
      rfs.call(document);
      this.isFullScreen = false
    }
  }

  /**
   * 全屏监听函数
   */
  handleScreenChange () {
    const isFullscreen = !(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
    if (isFullscreen) {
      // 退出全屏
      this.toggleNavCrumb(false)
    } else {
      // 全屏显示
      this.toggleNavCrumb(true)
    }
  }

  /**
   * 切换导航栏和面包屑的显示隐藏
   */
  toggleNavCrumb (bool) {
    this.updateNav(bool)
    this.hideCrumb(bool)
    this.isFullScreen = bool
  }
}
</script>
<style lang="less">
.config {
  text-align: center;
}
</style>
