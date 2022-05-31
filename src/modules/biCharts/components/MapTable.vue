<template>
  <section class="map-table">
    <div class="map-table__table-box" v-if="tableData.length">
      <el-table
        :data="tableData"
        class="map-table__table"
      >
        <el-table-column
          label="经销店"
          width="60"
        >
          <template slot-scope="scope">
            <div class="map-table__store-name">{{scope.row.store_name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="auctions"
          label="上拍台次"
          width="55">
        </el-table-column>
        <el-table-column
          label="拍出率"
          width="40"
        >
          <template slot-scope="scope">
            <div class="map-table__store-name">{{ formatter(scope.row.auction_rate) }}%</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <slot name='control' />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopData extends Vue {
  @Prop({default: () => []}) readonly tableData: any[]

  formatter (item) {
    return parseFloat(item).toFixed(1)
  }
}
</script>

<style lang="less">
.map-table {
  position: absolute;
  bottom: 0;
  right: 0;
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

  &__store-name {
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
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

  .el-table{
    &__empty-block {
      margin: auto;
      background: transparent;
    }

    &__empty-text {
      color: rgba(255, 255, 255, 0.6);
    }

    &__empty-text {
      display: block;
      width: 100%;
      text-align: center;
      height: 200px;
      line-height: 200px;
    }
  }

}
</style>
