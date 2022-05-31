<template>
  <section class="map">
    <chart
      class="map__chart"
      ref="mapChart"
      :option.sync="option"
      :theme="theme"
      autoresize
      @click='handleClick'
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import eCharts from 'vue-echarts'

@Component({
  components: {
    chart: eCharts,
  }
})
export default class Map extends Vue {
  @Prop({ default: () => {} }) readonly option: Array<any>
  private theme = require('../theme/index.json')

  handleClick(e) {
    this.$emit('click', e)
  }
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 50vh;
}
</style>
