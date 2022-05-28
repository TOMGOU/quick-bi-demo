<template>
 <div class="cbs-protocol">
    <el-dialog
      title="第三方车况服务公告"
      :visible="visible"
      width="30%">
      <p class="cbs-protocol__content">1、您即将查看的车况报告源自查博士，立新二手车平台是无法对该结果做任何修改。查博士的车况报告可能会随查询时间而变化，不同时间点查询出来的结果或有不同。</p>
      <p class="cbs-protocol__content">2、查博士车况报告仅供参考，不能作为实车车况凭证，更不能作为立新二手车平台的车辆车况争议依据。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CbsReportReview extends Vue {
  @Prop({ default: false }) readonly visible!: boolean

  @Prop({ default: '' }) readonly src!: string

  handleCancel() {
    this.$emit('update:visible', false);
  }

  handleConfirm() {
    this.$emit('confirm');
    this.$emit('update:visible', false);
  }
}
</script>

<style lang="less">
.cbs-protocol {
  &__content {
    line-height: 20px;
  }
}
</style>
