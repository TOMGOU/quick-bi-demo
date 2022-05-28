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
    <div class="map-table__pagination">
      <div class="map-table__icon-box">
        <i class="lx-icon-arrow-left" @click="handleChangeSession(false)"></i>
      </div>
      <div class="map-table__session-name">{{ sessionName }}</div>
      <div class="map-table__icon-box">
        <i class="lx-icon-arrow-right" @click="handleChangeSession(true)"></i>
      </div>
      <div class="map-table__button" @click="handleTriggerAuto">
        <i v-if="!bool" class="lx-icon-ic_play map-table__button--icon"></i>
        <i v-if="bool" class="lx-icon-ic_suspend map-table__button--icon"></i>
      </div>
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
  @Prop({default: true}) readonly bool: boolean

  handleChangeSession(bool) {
    this.$emit('handleChangeSession', bool);
  }

  handleTriggerAuto() {
    this.$emit('handleTriggerAuto');
  }

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

  &__pagination {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 150px;
    height: 24px;
    line-height: 24px;
    margin-top: 20px;
    background-color: #0a1934;
    border: solid 1px #0cf9ff;
    color: #fff;

    .lx-icon-arrow-left, .lx-icon-arrow-right {
      font-size: 12px;
      width: 20px;
      height: 24px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
    }
  }

  &__store-name {
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  &__session-name {
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    border-right: solid 1px #0cf9ff;
    border-left: solid 1px #0cf9ff;
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__icon-box {
    width: 22px;
    height: 22px;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
  }

  &__button {
    position: absolute;
    top: -1px;
    right: -30px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: solid 1px #0cf9ff;
    background-color: #0a1934;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    cursor: pointer;

    &--icon {
      font-size: 14px;
      vertical-align: middle;
      margin-top: -4px;
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
