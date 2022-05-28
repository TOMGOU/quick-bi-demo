<template>
  <BreadCrumbComp :pathList="breadCrumbList" :shortName="groupShortName"></BreadCrumbComp>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import BreadCrumbComp from '@/components/BreadCrumb.vue'
import { queryMap, mapBreadCrumb } from './config'
import { State } from 'vuex-class'

@Component({
  components: {
    BreadCrumbComp
  }
})
export default class BreadCrumb extends Vue {
  // @State('group') groupInfo

  breadCrumbList = []

  groupShortName = 'TOMGOU'

  // get groupShortName() {
  //   return this.groupInfo.short_name
  // }

  @Watch('$route.path')
  handleBreadCrumbUpdate(list) {
    const { path, query, params, meta } = this.$route
    const breadCrumbStr = meta.breadCrumb || ''
    const paramList = breadCrumbStr.match(/\{([^\{\}]+)\}/g)
    let finalBreadCrumbStr = breadCrumbStr

    if (paramList !== null) { // 有需要替换的参数
      const paramNameList = paramList.map(str => str.slice(1, -1)) // 变量名称列表
      paramNameList.forEach(param => {
        // 1. 将面包屑中的参数替换成值，值可以来自路由的params或query，即路径上的任何参数值
        let paramValue = (query[param] || params[param]) as string
        if (!paramValue && param === 'pageDetail') {
          paramValue = mapBreadCrumb(query.pageType)
        }
        finalBreadCrumbStr = finalBreadCrumbStr.replace(`{${param}}`, paramValue)

        // 2. 将值替换成对应的面包屑字符
        // 处理usedCar模块的pageType参数
        const pageTypeKeyList = Object.keys(queryMap)
        if (pageTypeKeyList.includes(paramValue)) {
          pageTypeKeyList.forEach(key => {
            finalBreadCrumbStr = finalBreadCrumbStr.replace(key, queryMap[key])
          })
        }
      })
    }

    this.breadCrumbList = finalBreadCrumbStr.split('/').map(str => ({title: str}))

    console.log(this.breadCrumbList)
  }
}
</script>