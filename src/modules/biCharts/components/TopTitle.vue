<template>
  <section class="top-title">
    <div class="top-title__title" :title="title">
      {{ title }}
    </div>
    <div class="top-title__left"  v-if="isShow">
      <span class="top-title__left__summaryname" :title="summaryName">{{summaryName}}</span>
      <span class="top-title__left__sessionname" v-if="sessionName !== summaryName">-{{ sessionName }}</span>
    </div>
    <div class="top-title__right">
      <div class="top-title__date-time">
        {{ dataTime }}
      </div>
      <i class="lx-icon-full-screen top-title__icon" @click="handleFullScreen"></i>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import util from '@/common/util';

@Component
export default class TopTitle extends Vue {
  @Prop({default: '公开场数据监控'}) readonly title: string
  @Prop({default: '河南专场'}) readonly sessionName: string
  @Prop({default: true}) readonly isShow: boolean
  @Prop({default: '公开场'}) readonly summaryName: string
  private timer = null
  private dataTime = ''

  mounted () {
    this.timer = setInterval(() => {
      this.dataTime = util.formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }, 1000)
  }

  destroyed () {
    clearInterval(this.timer)
  }

  handleFullScreen() {
    this.$emit('handleFullScreen')
  }
}
</script>

<style lang="less" scoped>
.top-title {
  position: relative;
  width: 100%;
	height: 100px;
	background-image: linear-gradient(0deg, rgba(6, 6, 57, 0.32) 0%, rgba(12, 249, 255, 0.8) 100%);

  &__title {
    position: relative;
    width: 700px;
    height: 100px;
    box-sizing: border-box;
    padding: 0 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 100px;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: #ffffff;
    margin: auto;
    background-image: url(../../../assets/styles/images/title-bg.png);
  }

  &__left {
    position: absolute;
    top: 27px;
    left: 27px;
    width: 280px;
    height: 24px;
    color: #ffffff;
    font-size: 24px;
    height: 24px;
    line-height: 24px;
    white-space: nowrap;
    &__summaryname {
      display: inline-block;
      max-width: 280px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &__sessionname {
      vertical-align: top;
    }
  }

  &__right {
    position: absolute;
    top: 27px;
    right: 27px;
    width: 280px;
    height: 24px;
    display: flex;
    justify-content: space-between;
  }

  &__date-time {
    color: #ffffff;
    font-size: 24px;
    height: 24px;
    line-height: 24px;
  }
  
  &__icon {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;

    &:before {
      color: #fff;
    }
  }
}
</style>
