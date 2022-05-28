<template>
  <el-dialog class="img-prev__dialog" v-if="currImage" :visible="visible" @close="handleDialogClose" :append-to-body="appendToBody" :destroy-on-close="destroyOnClose">
    <div class="img-prev__image-wrap">
      <img :src="currImage.url" class="img-prev__image" />
      <div class="img-prev__left-btn" @click="handlePreview(-1)"></div>
      <div class="img-prev__right-btn" @click="handlePreview(1)"></div>
    </div>
    <div slot="footer" class="img-prev__desc">
      <div class="img-prev__desc-title">{{currImage.title}}</div>
      <div class="img-prev__desc-text">{{currImage.desc}}</div>
      <div class="img-prev__desc-count">
        <span class="img-prev__curr-count">{{currIdx + 1}}</span>
        /<span class="img-prev__total-count">{{imageList.length}}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import interceptors from '@/ajax/interceptors'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

interface ImgItem {
  url: string,
  title: string,
  desc: string
}

@Component
export default class PreviewImages extends Vue {
  @Prop({default: () => []}) imageList: ImgItem[]
  @Prop({default: false}) visible: boolean
  @Prop({default: 0}) currIndex: number
  @Prop({default: false}) appendToBody: boolean
  @Prop({default: false}) destroyOnClose: boolean

  currIdx: number = 0
  currImage = {}

  @Watch('imageList')
  onImageListChange(list) {
    this.currIdx = 0
    this.currImage = this.imageList[0]
  }

  @Watch("currIndex")
  onCurrIndexChange(i) {
    this.currIdx = i
  }

  @Watch("currIdx")
  onCurrIdxChange(i) {
    this.currImage = this.imageList[i]
  }

  handlePreview(n) {
    const currIdx = this.currIdx + n
    if (currIdx >= this.imageList.length || currIdx < 0) return
    this.currIdx = currIdx
  }

  handleDialogClose() {
    this.currIdx = 0
    this.currImage = {}
    this.$emit("update:visible", false)
  }
}
</script>

<style lang="less" scoped>
@dialog-width: 800px;
@content-height: calc(2 * @dialog-width / 3);

/deep/ .el-dialog {
  width: @dialog-width;
}
.img-prev {

  &__image-wrap {
    background-color: #fff;
    position: relative;
    width: @dialog-width;
    height: @content-height;
    background-color: #000;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__desc {
    background-color: #fff;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    min-height: 53px;
  }

  &__desc-title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 8px;
    text-align: left;
  }

  &__desc-text {
    font-size: 12px;
    color: #989ea9;
    text-align: left;
  }

  &__desc-count {
    position: absolute;
    right: 15px;
    top: 15px;
  }

  &__curr-count {
    font-size: 14px;
    color: #333333;
  }

  &__total-count {
    font-size: 12px;
    color: #333333;
  }

  &__left-btn,
  &__right-btn {
    top: 0;
    bottom: 0;
    position: absolute;
    width: 80px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.5);
      transition: background-color 0.5s ease-out;
    }

    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      top: 50%;
      margin-top: -15px;
      border-left: 3px solid rgba(255, 255, 255, 0.5);
      border-top: 3px solid rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
  }

  &__left-btn {
    left: 0;
    &::after {
      left: 30px;
      transform: rotate(-45deg);
    }
  }
  &__right-btn {
    right: 0;
    &::after {
      right: 30px;
      transform: rotate(135deg);
    }
  }


  &__dialog {
    /deep/ .el-dialog__header {
      display: none;
    }
    /deep/ .el-dialog__body {
      padding: 0;
      width: @dialog-width;
      height: @content-height;
      max-height: @content-height;
    }
    /deep/ .el-dialog__footer {
      height: auto;
      padding: 0;
    }
  }
}
</style>
