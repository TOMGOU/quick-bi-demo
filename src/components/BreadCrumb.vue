<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in pathList"
        :key="item.title"
        class="bread-crumb__item">
        <span
          @click="handleNavigate(item)"
          :class="['bread-crumb__text', {'bread-crumb__text--no-path': !item.path}]"
        >{{item.title}}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <span class="bread-crumb__group-name">{{ shortName }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

interface route {
  path?: string
  title: string
  query?: { [k: string]: string }
}

@Component
export default class BreadCrumb extends Vue {
  @Prop({default: () => []}) pathList: route[]
  @Prop(String) shortName: string

  handleNavigate(item) {
    this.$emit('nav', item)
  }
}
</script>

<style lang="less">
.bread-crumb {
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #ffffff;
  box-shadow: 0px 1px 4px 0px	rgba(0, 21, 41, 0.12);
  position: relative;
  
  &__item {
    font-size: 12px;
    &:not(:last-child) {
      .el-breadcrumb__inner {
        color: #1890ff;
      }
    }
  }

  &__text {
    &--no-path {
      cursor: not-allowed;
    }
  }
  &__group-name {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 0 15px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    color: #333333;
  }
}
</style>