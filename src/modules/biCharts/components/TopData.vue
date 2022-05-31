<template>
  <section class="top-data">
    <div class="top-data__container">
      <div v-for="item in copyData" :key="item.title" class="top-data__box">
        <div class="top-data__title">{{ item.title }}</div>
        <div class="top-data__value">
          {{ item.amount || '--' }}{{ item.showPercent ? '%': ''}}
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class TopData extends Vue {
  @Prop({default: []}) readonly mapData: any[]
  private copyData = []

  @Watch('mapData')
  onMapDataChange(newValue, oldValue) {
    this.copyData = this.mapData.map((item) => ({
      ...item,
      showPercent: item.value && item.percent,
      amount: item.value
    }))
    this.mapData.forEach((item, index) => {
      this.handleNumChange(oldValue[index].value, newValue[index].value, index)
    })
  }

  handleNumChange(startNum, maxNum, index) {
    let numText = startNum
    let timer = null
    const numSlideChange = () => {
      const step = maxNum > startNum ? Math.ceil((maxNum - startNum) / 30) : Math.floor((maxNum - startNum) / 30)
      numText += step
      if ((maxNum >= startNum && numText >= maxNum) || (maxNum <= startNum && numText <= maxNum)) {
        numText = maxNum
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
    margin-top: 30px;
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
