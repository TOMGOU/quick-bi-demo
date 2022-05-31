import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
const china = require('../../map/china.json')

@Component
export default class CarDealerBIMixin extends Vue {
  @Mutation('UPDATE_NAV') updateNav
  @Mutation('UPDATE_CRUMB') hideCrumb

  // 页面自适应字体大小
  fontSize = 12
  // 直辖市(特殊的省份)
  specialProvinces = ['北京市', '上海市', '天津市', '重庆市']
  // 地图高亮的样式
  highlightItem = {
    normal: {
      areaColor: '#ffde81', // #554E3E
      color: "#ffde81",
      borderColor: "#ffde81",
      borderWidth: 1,
      borderType: "solid",
      label: { show: false }
    },
    emphasis: {
      areaColor: '#ffde81',
      color: "#ffde81",
      borderColor: "#ffde81",
      borderWidth: 1,
      borderType: "solid",
      label: { show: false }
    },
  }
  // 中国地图geo数据
  CHINA_GEO = china

  // 设置字体大小
  setFontSize () {
    this.fontSize = window.screen.width > 1600 ? 12 : 10
  }

  // 页面全屏事件
  handleFullScreen () {
    if (!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
      const docs = document.documentElement as any;
      const rfs = docs.requestFullscreen || docs.webkitRequestFullScreen || docs.mozRequestFullScreen || docs.msRequestFullscreen;
      rfs.call(docs);
      this.toggleNavCrumb(true)
    } else {
      const rfs = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
      rfs.call(document);
      this.toggleNavCrumb(false)
    }
  }

  // 切换导航栏和面包屑的显示隐藏
  toggleNavCrumb (bool) {
    this.updateNav(bool)
    this.hideCrumb(bool)
  }
}
