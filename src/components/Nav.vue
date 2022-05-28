<template>
  <section class="wrapper-nav__sec">
    <div class="wrapper-nav__logo"></div>
    <el-menu
      class="el-menu-vertical"
      :collapse="true"
      background-color="#001529"
      text-color="#5f81a1"
      active-text-color="#fff"
      :default-active="$route.path"
    >
      <el-submenu
        v-for="(item, index) in menus"
        :key="`_${index}`"
        :index="`${index}`"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <i class="name">{{ item.name }}</i>
        </template>
        <el-menu-item
          v-for="subItem in item.submenus"
          :key="subItem.name"
          :index="subItem.path"
          @click="handleSubMenu(subItem, item)"
          :class="[{'is-active': subMenuPath === subItem.path}]"
        >
          <template slot="title">{{ subItem.name }}</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-dropdown class="wrapper-nav__user" @command="handleCommand">
      <a href="javascript:void(0);" class="el-dropdown-link">{{userName}}</a>
      <el-dropdown-menu slot="dropdown" class="sign-out">
        <el-dropdown-item command="logout">
          <i class="lx-icon-exit" />
          安全退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { leftNav } from './leftNavTpl'
import cache from '@/common/cache'

@Component
export default class Nav extends Vue {
  @Mutation('UPDATE_USERINFO') UPDATE_USERINFO
  // @Mutation('UPDATE_BREAD_CRUMB_LIST') updateBreadCrumbList
  subMenuPath = '/operate/rolepermission'

  async mounted () {
    const menuPath = localStorage.getItem('subMenuPath')
    const currentPath = window.location.pathname

    if (menuPath && (menuPath === currentPath)) {
      this.subMenuPath = menuPath;
    } else {
      this.subMenuPath = currentPath
      this.setCacheMenuName()
    }
  }

  async handleCommand () {
    // const { code } = await this.$rest.login.out()
    // if (code === 0) {
    //   this.UPDATE_USERINFO([])
    //   this.go('/login')
    // }
    cache.clearLocalStorageData('access_token')
    this.go('/login')
  }

  go (path) {
    if (this.$route.path !== path) {
      this.$router.push({ path }).catch(_ => {})
    }
  }

  handleSubMenu (subItem) {
    const { path } = subItem
    this.subMenuPath = path
    this.setCacheMenuName()
    this.go(path)
  }

  setCacheMenuName () {
    localStorage.setItem('subMenuPath', this.subMenuPath)
  }

  get userName () {
    const name = this.$store.state.userName || ''
    return name.charAt(name.length - 1)
  }

  get menus() {
    // 根据权限列表确定展示的导航
    const { authList = [] } = this.$store.state;
    const menus = JSON.parse(JSON.stringify(leftNav));

    const menusInfo = menus
      // .filter(item => (!item.auth || authList.includes(item.auth))) // 过滤没有权限的模块
      .map(item => {
        // const subMenus = item.submenus.filter(sub => (!sub.auth || authList.includes(sub.auth)))
        // 如果子菜单为空，则该模块也不应该显示
        return item.submenus.length > 0 ? { ...item, submenus: item.submenus } : null
      })
      .filter(item => item !== null)
    return menusInfo;
  }

  beforeDestroy () {
    localStorage.setItem('subMenuPath', '')
  }
}
</script>

<style lang="less">
  .wrapper-nav {
    &__sec {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 60px;
      height: auto!important;
      background-color: #001529;
      z-index: 999;
    }
    &__logo {
      width: 60px;
      height: 48px;
      // background: url('../assets/styles/images/home/g_logo.png') no-repeat;
      background-size: 22px 22px!important;
      background-position: center!important;
      // background-color: #002140!important;
    }
    &__user {
      position: fixed!important;
      display: block!important;
      width: 48px;
      left: 0;
      bottom: 10px;
      line-height: 48px;
      text-align: center;
      .el-dropdown-link {
        display: inline-block;
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 50%;
        color: #dee9ff;
        background: #555170;
      }
    }
  }
  .el-menu-vertical {
    width: 60px!important;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
    .el-menu-item [class^=el-icon-] {
      width: auto;
      margin-right: 0;
    }
    .el-submenu [class^=el-icon-] {
      font-size: 20px!important;
    }
    .el-submenu__title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        color: #5f81a1;
      }
      .name {
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    .is-active {
      .el-submenu__title {
        background-color: #1890ff!important;
      }
      i {
        color: #fff;
      }
    }
  }
  .el-menu--vertical {
    .el-menu--popup {
      padding: 0;
    }
    .is-active {
      background-color: #1890ff!important;
      color: #fff;
    }
    .el-menu-item {
      height: 48px;
      line-height: 48px;
      font-size: 12px;
      box-shadow: 1px 0px 4px 0px 
    rgba(0, 21, 41, 0.12);
      &:hover {
        color: #fff !important;
      }
    }
  }
  .sign-out .el-dropdown-menu {
    margin-left: 50px!important;
  }
  .el-menu--popup-right-start {
    .is-active {
      color: #fff!important;
    }
  }
</style>
