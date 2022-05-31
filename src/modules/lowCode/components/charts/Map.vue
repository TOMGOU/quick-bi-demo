<template>
  <section
    class="map"
    :style="cssStyle"
    @dragover.prevent
    @drop.stop="handleDrop"
  >
    <slot></slot>
    <chart class="map__chart" ref="mapChart" :option.sync="option" :theme="theme" autoresize></chart>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'

@Component({
  components: {
    chart: eCharts,
  }
})
export default class Map extends Vue {
  @Prop({ default: () => ({}) }) readonly option: any
  @Prop({ default: () => ({}) }) readonly cssStyle: any
  @Prop({default: () => ({})}) jsonSchema
  private theme = require('../../theme/index.json')

  handleDrop (e) {
    this.$emit('drop', e, this)
  }
}
</script>

<style lang="less" scoped>
.map {
  position: relative;
  width: 100%;
  height: 50vh;

  // &__map {
  //   width: 560px;
  //   height: 30vh;
  // }
}
</style>
