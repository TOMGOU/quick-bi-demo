<template>
  <div class="chart">
    <render-engine ref="engine"
      :jsonSchema.sync="jsonSchema"
    ></render-engine>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import RenderEngine from './fragments/RenderEngine.vue'
import * as echarts from 'echarts/core'

@Component({
  components: {
    RenderEngine,
  }
})
export default class PublicSession extends Vue {
  @Mutation('UPDATE_NAV') updateNav
  @Mutation('UPDATE_CRUMB') hideCrumb
  // 初始数据
  private jsonSchema: any = {
    type: 'RootContainerParse',
    uuid: 'root',
    option: {}
  }

  private isFullScreen = false

  mounted () {
    const id = this.$route.query.id
    this.fetchChartConfig(id)
    window.addEventListener('fullscreenchange', e => {
      this.handleScreenChange()
    })
  }

  /**
   * 页面销毁事件
   */
  async fetchChartConfig (id) {
    const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.fetchChartConfig({ id }) || {}
    // if (code !== 0) return
    this.jsonSchema = data
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
