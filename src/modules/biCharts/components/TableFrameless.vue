<template>
  <div class="table-frameless-box" :style="{...cssStyle}">
    <title-line :title="title"></title-line>
    <el-table
      :data="tableData"
      :show-header="false"
      class="table-frameless__table"
    >
      <el-table-column
        label="名次"
        min-width="8%"
        type="index"
      >
        <template slot-scope="scope">
          <div class="table-frameless__icon-box">
            <img class="table-frameless__icon" :src="require(`@/assets/styles/images/rank-${scope.row.rank}.png`)" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="店名"
        min-width="18%"
      >
        <template slot-scope="scope">
          <div class="table-frameless__store-name">{{scope.row.store_name}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="参拍数"
        min-width="17%"
      >
        <template slot-scope="scope">
          <div>参拍台数{{scope.row.car_count}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="成交数"
        min-width="17%"
      >
        <template slot-scope="scope">
          <div>成交台数{{scope.row.sold_car_count}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="成交率"
        min-width="20%"
      >
        <template slot-scope="scope">
          <div>成交率{{ (+scope.row.rates).toFixed(1) }}%</div>
        </template>
      </el-table-column>
      <el-table-column
        label="毛利率"
        min-width="20%"
      >
        <template slot-scope="scope">
          <div>毛利率{{ (+scope.row.gross_profit_rates).toFixed(1) }}%</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitleLine from './basics/TitleLine.vue';

@Component({
  components: {
    TitleLine
  }
})
export default class TableFrameless extends Vue {
  @Prop({ default: () => [
    {
      rank: '1',
      store_name: '雷克萨斯',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '2',
      store_name: '雷克萨斯',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '3',
      store_name: '雷克萨斯',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
  ]}) readonly tableData: Array<any>
  @Prop({default: '日拍卖趋势图'}) readonly title: string
  @Prop({default: () => ({})}) readonly cssStyle: any
}
</script>

<style lang="less" scoped>
.table-frameless-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.table-frameless {
  &__table {
    width: 100%;
    background-color: #100B2A;
    text-align: center;
    color: #fff;
    margin-top: 5px;

    /deep/.el-table__empty-block {
      margin: auto;
      background: transparent!important;
      min-height: 20px;
      line-height: 10vh;
    }

    /deep/.el-table{
      &__row{
        background-color: transparent!important;
      }
    }

    /deep/.cell{
      color: #fff;
      padding: 0;
    }
    
    /deep/td{
      border-bottom: none;
      text-align: center;
      font-size: 12px;
    }

    @media screen and (max-device-width: 1800px){
      /deep/td{
        padding: 2px 0;
      }
    }

    @media screen and (max-device-width: 1200px){
      /deep/td{
        padding: 0;
      }
    }
  }

  &__store-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffde81;
    text-align: left;
  }

  &__icon-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__icon {
    display: block;
    width: 20px;
    height: 20px;
  }

  &__empty {
    height: 80%;
    line-height: 15vh;
    text-align: center;
    color: #333;
  }
}
</style>
