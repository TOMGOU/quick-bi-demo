<template>
  <div class="list-action" v-if="actionList.length > 0">
    <el-popover
      ref="actionPopover"
      popper-class="list-action__popover"
      v-model="isShow"
      placement="bottom"
      trigger="hover">
      <div class="list-action__list">
        <div v-for="item in actionList" :key="row.auction_id + item.text">
          <div
            class="list-action__list-item"
            @click.stop="handleAction(item)"
            :style="{ color: item.color || null }">
            {{item.text}}
          </div>
        </div>
      </div>
    </el-popover>

    <div class="list-action__btn" v-popover:actionPopover>操作<i class="el-icon-arrow-down el-icon--right"></i></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'


interface Action {
  text: string
}

@Component({
  components: {
  }
})
export default class TableAction extends Vue {
  @Prop({default: () => []}) readonly actionList: Action[]
  @Prop({default: () => {}}) row

  isShow = false

  get auditInfo () {
    if (this.row) {
      return {
        ...this.row,
        reference_id: this.row.auction_id,
      }
    }
    return {}
  }

  // hack 多个popover冲突的情况
  handleMouseOver() {
    const popoverEl = this.$refs[this.row.auction_id]
    if (popoverEl) {
      popoverEl[0].$children[0].doShow()
    }
  }

  // hack 多个popover冲突的情况
  hideAll() {
    const popoverEl = this.$refs[this.row.auction_id]
    if (popoverEl) {
      popoverEl[0].$children[0].doClose()
    }
  }

  handleAction(item) {
    this.isShow = false
    this.$emit('action', item)
  }
}
</script>

<style lang="less">

.list-action__popover.el-popover {
  min-width: 74px !important;
  border: none !important;
  background: rgba(255, 255, 255, 0);
  border-radius: 5px;
  height: 0;
}
.list-action {
  font-size: 12px;
  color: #1890ff;


  &__btn {
    cursor: pointer;
    color: #333333;
    &:hover {
      color: #1890ff;
    }
  }

  &__list {
    margin-top: -3px;
    padding: 10px 5px;
    // width: 74px;
    color: #1890ff;
    background-color: #ffffff;
	  box-shadow: 0 2px 10px 0 rgba(76, 104, 155, 0.24);
    border-radius: 5px;
    border: solid 1px #d8dce6;
  }

  &__list-item {
    width: 100%;
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    padding: 0 20px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
