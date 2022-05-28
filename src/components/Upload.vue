<template>
  <section class="uploads">
    <div class="uploads__item" v-for="(item, index) in uploadFiles" :key="index">
      <el-upload
        :headers="headers"
        :action="action"
        :show-file-list="false"
        :on-success="res => handleSuccess(res, index)"
        :before-upload="uploadRules"
      >
        <i v-if="item['thumbnail_image']" class="el-icon-close delete" @click="handleRemove(item, index)"></i>
        <div v-if="item['thumbnail_image']" class="uploads__item uploads__item--active" slot="trigger">
          <img :src="getUploadUrl(item, 'thumb', requireImageToken)" alt="">
        </div>
        <div v-else class="uploads__item uploads__item--default">
          <i class="el-icon-plus icon"></i>
          <span class="text">上传图片</span>
        </div>
      </el-upload>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import { checkUploadImgRules, getUploadImg } from '../common/image'

interface UploadImages {
  image: string,
  thumbnail_image: string,
  upload_image: string,
}

@Component
export default class Upload extends Vue {
  @Prop({ default: () => ({}) }) headers: {[key: string]: string}
  @Prop({ default: '' }) action: string
  @Prop({ default: () => [{}] }) files: Array<UploadImages>
  @Prop({ default: 1 }) limit: number
  @Prop({ default: false }) requireImageToken: boolean

  private uploadRules = checkUploadImgRules

  private getUploadUrl = getUploadImg
  
  defaultUploadPlace: UploadImages = {
    image: '',
    thumbnail_image: '',
    upload_image: '',
  }

  fileList: Array<UploadImages> = []

  

  get uploadFiles() {
    this.fileList = [...this.files]
    if (this.fileList.length === 0 || this.fileList.length < this.limit) {
      this.fileList.push(this.defaultUploadPlace)
    }
    return this.fileList
  }

  handleRemove(item, index) {
    const fileList = [...this.files]
    fileList.splice(index, 1)
    this.$emit('on-remove', item, index, fileList)
  }

  handleSuccess(res, index) {
    if (res.code === 0) {
      this.fileList.splice(index, 1, res.data)
      if (this.fileList.length < this.limit && !(index === (this.fileList.length - 1))) {
        this.fileList.pop()
      }
      this.$emit('on-success', res.data, index, this.fileList)
    } else {
      Message.error(res.message)
    }
  }
}
</script>

<style lang="less" scoped>
.uploads {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  line-height: 0;
  &__item {
    position: relative;
    .delete {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 16px;
      height: 16px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      line-height: 16px;
      background-color: #000;
      border-radius: 50%;
      cursor: pointer;
    }
    &--active {
      margin: 0 0 15px 15px;
      img {
        display: inline-block;
        width: 100px;
        height: 66px;
      }
    }
    &--default{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 0 15px 15px;
      width: 100px;
      height: 66px;
      border: 1px dashed #afd9ff;
      background-color: #f1faff;
      .icon {
        font-size: 20px;
        color: #1890ff;
      }
      .text {
        display: inline-block;
        height: 18px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18px;
        color: #1890ff;
        margin-top: 5px;
      }
    }
  }
}
</style>