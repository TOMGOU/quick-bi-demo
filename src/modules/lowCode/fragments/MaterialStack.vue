<template>
  <section class="components">
    <div class="components__title">
      物料堆
    </div>
    <div class="components__category">
      基础
    </div>
    <ul>
      <li v-for="(item, index) in basics" :key="index"
        class="components__item"
        :draggable="true" @dragstart="handleDrag(item.name)"
        >
        {{ item.des }}
      </li>
    </ul>
    <div class="components__category">
      容器
    </div>
    <ul>
      <li v-for="(item, index) in containers" :key="index"
        class="components__item"
        :draggable="true" @dragstart="handleDrag(item.name)"
        >
        {{ item.des }}
      </li>
    </ul>
    <div class="components__category">
      图表
    </div>
    <ul>
      <li v-for="(item, index) in charts" :key="index"
        class="components__item"
        :draggable="true" @dragstart="handleDrag(item.name)"
        >
        <i :class="item.icon"></i>
        <div class="components__des">{{ item.des }}</div>
      </li>
    </ul>
  </section>
</template>
<script>
import { charts, containers, basics } from '../components'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class'

const biCharts = namespace('biCharts')
console.log({ charts, containers, basics })

@Component
export default class ConfigPanel extends Vue {
  @biCharts.Action('setSelectedType') setSelectedType
  @biCharts.State('selectedType') selectedType

  charts = charts

  containers = containers

  basics = basics

  // 拾取被配置节点
  handleDrag (item) {
    this.setSelectedType({selectedType: item})
  }
}
</script>
<style lang="less">
  .components {
    &__title {
      padding: 10px;
      font-size: 26px;
      font-weight: bold;
    }

    &__category {
      padding-left: 15px;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }

    &__item {
      margin: 2px 5px;
      padding: 10px 0;
      border-radius: 18px;
      text-align: center;
    }

    &__des {
      margin-top: 5px;
      text-align: center;
    }
  }
</style>