<template>
  <div class="car-card">
    <div class="car-card__left">
      <el-image
        style="width:40px;height:40px;"
        :src="info.brandUrl"
        fit="fill">
      </el-image>
      <div class="car-card__car-info">
        <div class="car-card__car-modal">{{info.carModal}}</div>
        <div class="car-card__car-detail">
          <div class="car-card__detail-info">{{info.plateNumber}}</div>
          <div class="car-card__detail-info">{{info.date}}</div>
          <div class="car-card__detail-info">{{info.miles}}</div>
          <div class="car-card__detail-info">{{info.emissionStandard}}</div>
        </div>
        <div class="car-card__store-info">所属经销店：{{info.storeName}}</div>
      </div>
      <div class="car-card__video" v-if="info.videoUrl">
        <CarVideo :videoUrl="info.videoUrl"></CarVideo>
      </div>
      <!-- <div class="car-card__video" v-if="info.videoUrl" @click="handlePlayVideo">
        <i class="el-icon-video-play"></i>
        查看整车视频
      </div> -->
    </div>
    <div class="car-card__right">
      <slot></slot>
    </div>
    <div class="car-card__label" v-if="info.label">{{info.label}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CarVideo from './CarVideo.vue'

interface CarInfo {
  brandUrl: string
  carModal: string
  plateNumber: string
  date: string
  miles: string
  emissionStandard: string
  storeName: string
  videoUrl: string
  label: string
}

@Component({
  components: {
    CarVideo
  }
})
export default class TableAction extends Vue {
  @Prop({default: () => ({})}) info: CarInfo
}

</script>

<style lang="less">
.car-card {

  position: relative;
  display: flex;
  padding: 0 26px;
  box-sizing: border-box;
  height: 110px;
  background-color: #ffffff;
	box-shadow: 0 1px 10px 0 #d8dce6;

  &__left,
  &__right {
    width: 50%;
    height: 100%;
    box-sizing: border-box;
  }

  &__left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__car-info {
    margin-left: 20px;
  }

  &__car-modal {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
  }

  &__car-detail {
    display: flex;
    font-size: 12px;
    color: #989ea9;
    margin: 5px 0;
  }

  &__detail-info {
    padding: 0 10px;
    border-right: 1px solid #989ea9;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      border-right: none;
    }
  }

  &__store-info {
    font-size: 12px;
    color: #989ea9;
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    // width: 80px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    padding: 0 8px;
    background-image: linear-gradient(135deg, #ff5980 0%, #ffa882 100%);
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 12px;
    color: #ffffff;
  }

  &__video {
    display: flex;
    align-items: center;
    padding-right: 10px;
    box-sizing: border-box;
    justify-content: space-between;
    cursor: pointer;
    // width: 113px;
    height: 30px;
    font-size: 12px;
    color: #1890ff;
    margin-left: 27px;
    background: #e7f6ff;
  }
}
</style>
