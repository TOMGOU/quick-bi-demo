<template>
  <section class="components">
    <div class="components__title">
      物料堆
    </div>
    <ul>
      <li v-for="(item, index) in stacks" :key="index"
        class="components__item"
        :draggable="true" @dragstart="handleDrag(item.name)"
        >
        {{ item.des }}
      </li>
    </ul>
  </section>
</template>
<script>
import { components, parsersList } from '../components'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class'

const biCharts = namespace('biCharts')

@Component
export default class ConfigPanel extends Vue {
  @biCharts.Action('setSelectedType') setSelectedType
  @biCharts.State('selectedType') selectedType

  stacks = parsersList

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

    &__item {
      border: 1px solid var(--mainLine);
      margin: 2px 5px;
      padding: 10px 0;
      border-radius: 18px;
    }
  }
</style>