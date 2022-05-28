<template>
  <div id="app" :class="['app-page', {poker: redirect}]">
    <navigation v-if="!hideNav"></navigation>

    <section class="app-page__bread-crumb" v-show="!isLoginPage && !hideCrumb">
      <BreadCrumb></BreadCrumb>
    </section>

    <section :class="['main-space', {'main-space--login': isLoginPage || (hideNav && hideCrumb)}]">
      <keep-alive><router-view v-if="!$route.meta.noneKeepAlive && isRender"></router-view></keep-alive>
      <router-view class="app-content" v-if="$route.meta.noneKeepAlive && isRender"></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import Navigation from './components/Nav.vue'
import util from '@/common/util'
import cache from '@/common/cache'
import BreadCrumb from './compsBusiness/BreadCrumb/index.vue'

@Component({
  components: {
    Navigation,
    BreadCrumb
  },
})
export default class App extends Vue {
  @Action('getCurrentGroup') getCurrentGroup
  @Getter('direction') direction
  @Getter('hideNav') hideNav
  @Getter('hideCrumb') hideCrumb
  @Getter('router') router

  isShowlook: boolean = true
  isInitCompleted: boolean = false
  isLoginPage: boolean = false
  // 不需要检查权限白名单，通过href include 匹配
  readonly whiteList = [
    '/login',
  ]

  get redirect () {
    const { redirect } = this.$store.state

    if (redirect) {
      this.$router.push({
        path: redirect
      })
    }
    return false
  }

  get iswhiteUrl () {
    const { pathname } = window.location
    const isWhite = this.whiteList.includes(pathname)
    return isWhite
  }

  @Watch('$route.path')
  onRouteChange(path) {
    this.isLoginPage = path.includes('/login')
  }

  // 不需要权限就可以直接渲染的页面
  get isRender () {
    return this.iswhiteUrl || this.isInitCompleted
  }

  created () {
    if (!this.iswhiteUrl) {
      this.isInitCompleted = false
      // 获取用户登录信息
      this.checkAuth().then(() => {
        this.isInitCompleted = true
      });
      // this.getCurrentGroup();
    }
  }
}
</script>

<style lang="less">
.benz-bg{
  height: 100%;
  background-color: #0e0e0c;
}

.section-with-aside-nav {
  margin-left: 40px !important;
  background: #ebedf1;
}
.el-alert__content {
  text-align: center;
}
.app-page {
  display: flex;

  &__bread-crumb {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    padding-left: 60px;
    box-sizing: border-box;
    z-index: 999;
  }
}
.app-content {
  width: 100%;
}
</style>
