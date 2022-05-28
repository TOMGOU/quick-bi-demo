<template>
 <div class="cbs-report-review">
   <el-dialog
      custom-class="cbs-dialog"
      width="25%"
      :visible="visible"
      @close="handleClose"
    >
      <iframe :src="src" frameborder="0"></iframe>
    </el-dialog>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CbsReportReview extends Vue {
  @Prop({ default: false }) readonly visible!: boolean
  @Prop({ default: '' }) readonly src!: string

  handleClose() {
    this.$emit('update:visible', false);
  }
}
</script>

<style lang="less">
.cbs-report-review {
  .cbs-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      max-height: 667px;
      overflow: hidden;
    }
    iframe {
      width: 100%;
      height: 667px;
    }
  }
}
</style>
