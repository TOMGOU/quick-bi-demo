<template>
  <section class="map-table" :style="cssStyle">
    <div class="map-table__table-box">
      <el-table
        :data="tableData"
        class="map-table__table"
      >
        <el-table-column
          prop="store_name"
          label="经销店"
          width="60">
        </el-table-column>
        <el-table-column
          prop="auctions"
          label="上拍台次"
          width="55">
        </el-table-column>
        <el-table-column
          prop="auction_rate"
          label="拍出率"
          width="40">
        </el-table-column>
      </el-table>
    </div>
    <div class="map-table__pagination">
      <i class="lx-icon-arrow-left" @click="handleChangeSession(false)"></i>
      <div>{{ sessionName }}</div>
      <i class="lx-icon-arrow-right" @click="handleChangeSession(true)"></i>
    </div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopData extends Vue {
  @Prop({default: () => []}) readonly tableData: any[]
  @Prop({default: '河南专场'}) readonly sessionName: string
  @Prop({default: () => ({})}) readonly cssStyle: any

  handleChangeSession(bool) {
    // this.$emit('handleChangeSession', bool);
    console.log({'tableData': this.tableData, 'sessionName': this.sessionName})
  }
}
</script>

<style lang="less">
.map-table {
  position: absolute;
  bottom: -10px;
  right: -20px;
  width: 180px;
  z-index: 1;

  &__table-box {
    padding: 10px;
    background-color: #0a1934;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    border: solid 1px #0cf9ff;
  }

  &__table {
    width: 160px;
    background-color: #0a1934;

    th, td, tr {
      height: 30px;
      line-height: 30px;
      padding: 0;
      text-align: center;
    }
  }

  &__pagination {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    background-color: #0a1934;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    border: solid 1px #0cf9ff;
    color: #fff;

    .lx-icon-arrow-left, .lx-icon-arrow-right {
      font-size: 16px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }

  .el-table__header {
    background: transparent;
  }

  .el-table__header thead th {
    background: transparent;
  }

  .el-table th > .cell {
    color: rgba(255, 255, 255, 0.6);
  }

  .el-table th, .el-table tr {
    background: transparent;
  }

  .el-table__body .cell {
    color: #fff;
  }

  .el-table__row > td {
    border: none;
    border-top: 1px solid #3b475c;
  }

  .el-table th.is-leaf {
    border: none;
  }

  /* 去掉最下面的那一条线 */
  .el-table::before {
    height: 0px;
  }

  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
