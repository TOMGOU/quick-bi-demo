<template>
  <div class="video-wrap">
    <div
      class="video-wrap__btn"
      @click="handlePlayVideo"><i class="lx-icon-video"></i><span class="video-btn">查看整车视频</span>
    </div>
    <el-dialog
      title="整车短视频"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="90%">
      <div class="video-box">
        <video
          width="100%"
          height="400px"
          :src="videoUrl"
          autoplay="autoplay"
          controls="controls">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'carVideo',
  props: {
    videoUrl: String,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handlePlayVideo() {
      if (!this.videoUrl) {
        this.$message.error('视频URL不存在');
        return false;
      }
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less">
  .video-wrap {
    display: inline-block;
    .lx-icon-video:before {
      margin-left: 10px;
      font-size: 14px;
      color: #409eff;
    }
    &__btn {
      display: flex;
      cursor: pointer;
    }
  }
  .video-btn{
    color: #409eff;
    margin-left: 5px;
  }
  .video-box {
    width: 100%;
  }
</style>
