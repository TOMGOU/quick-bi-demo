<template>
  <section class="top-data">
    <div class="top-data__container">
      <div v-for="item in copyData" :key="item.title" class="top-data__box">
        <div class="top-data__title" :style="{...cssStyle}">{{ item.title }}</div>
        <div class="top-data__value">{{ item.amount || '--' }}</div>
      </div>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TopData extends Vue {
  @Prop({default: () => ([])}) readonly mapData: any[]
  @Prop({default: () => ({})}) readonly cssStyle: any
  private copyData = this.mapData.map((item, index) => {
    return {
      ...item,
      amount: item.value
    }
  })
  @Watch('mapData', { immediate: true, deep: true })
  onMapDataChange(newValue, oldValue) {
    if (!oldValue) return
    this.mapData.map((item, index) => {
      this.handleNumChange(oldValue[index].value, newValue[index].value, index)
    })
  }

  handleNumChange(startNum, targetNum, index) {
    let numText = startNum
    var timer = null
    const numSlideChange = () => {
      const step = targetNum > startNum ? Math.ceil((targetNum - startNum) / 30) : Math.floor((targetNum - startNum) / 30)
      numText += step
      if ((targetNum >= startNum && numText >= targetNum) || (targetNum <= startNum && numText <= targetNum)) {
        numText = targetNum
        cancelAnimationFrame(timer)
      } else {
        timer = requestAnimationFrame(numSlideChange)
      }
      this.copyData[index].amount = numText
    }
    numSlideChange()
  }
}
</script>

<style lang="less" scoped>
.top-data {
  &__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    padding: 0 20px;
  }

  &__title {
    font-size: .18rem;
	  color: #ffffff;
  }

  &__value {
    height: 50px;
    line-height: 50px;
    font-size: 36px;
	  color: #ffde81;
    text-align: center;
  }
}
</style>
