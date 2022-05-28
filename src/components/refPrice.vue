<template>
 <div class="refPrice">
   <el-dialog
      title="平台参考价"
      :visible.sync="dialogVisible"
      class="refprice-dialog"
      width="40%">
      <div class="refprice-dialog-item refprice-dialog-car" v-if="carInfo">
        <div class="refprice-dialog-item__left" :style="{backgroundImage: `url(${carInfo.brand_logo})`}"></div>
        <div class="refprice-dialog-item__right">
          <p class="refprice-dialog-item__right-title ellipsis">{{carInfo.car_model_name}}</p>
          <p class="refprice-dialog-item__right-info">{{carInfo.belonged_city}}｜{{carInfo.license_issued_year}}年｜{{ carInfo.mileage }}公里</p>
          <p class="refprice-dialog-item__right-info">所属经销店：{{carInfo.store_name}}</p>
        </div>
      </div>
      <div class="refprice-dialog-refprice" v-if="selectedCar">
        <div class="refprice-dialog-refprice__bottom">
          <div class="refprice-dialog-refprice__info">
            <div class="refprice-dialog-item__left" v-if="!selectedCar.is_our_group" style="background-size: cover;"></div>
            <div class="refprice-dialog-item__left" v-else :style="{backgroundImage: `url(${selectedCar.car_image})`}"></div>
            <div class="refprice-dialog-item__right moreinfo">
              <p class="refprice-dialog-item__right-title">{{selectedCar.sold_price | fenToWan}}万</p>
              <p class="refprice-dialog-item__right-info ellipsis">{{selectedCar.car_model_name}}</p>
              <p class="refprice-dialog-item__right-info">{{selectedCar.belonged_city}}｜{{selectedCar.license_issued_year}}年｜{{ selectedCar.mileage }}公里</p>
              <p class="refprice-dialog-item__right-info">出库方式：{{selectedCar.status_name}}    卖车时间：{{selectedCar.sold_at}}</p>
            </div>
          </div>
          <div class="refprice-dialog-refprice__logo"></div>
        </div>
      </div>
      <div class="refprice-dialog-search">
        <el-checkbox v-model="refPriceParams.view_same_city" @change="handleReload" :disabled="isLoading">仅看同城</el-checkbox>
        <el-checkbox v-model="refPriceParams.the_same_year" @change="handleReload" :disabled="isLoading">同年上牌</el-checkbox>
      </div>
      <div class="refprice-dialog-others" v-infinite-scroll="handleLoadMore">
        <div class="refprice-dialog-item" v-for="item in refCars" :key="item.auction_car_id">
          <div class="refprice-dialog-item__left" v-if="!item.is_our_group" style="background-size: cover;"></div>
          <div class="refprice-dialog-item__left" v-else :style="{backgroundImage: `url(${item.car_image})`}"></div>
          <div class="refprice-dialog-item__right moreinfo">
            <p class="refprice-dialog-item__right-title">{{item.sold_price | fenToWan}}万</p>
            <p class="refprice-dialog-item__right-info ellipsis">{{item.car_model_name}}</p>
            <p class="refprice-dialog-item__right-info">{{item.belonged_city}}｜{{item.license_issued_year}}年｜{{item.mileage }}公里</p>
            <p class="refprice-dialog-item__right-info">出库方式：{{item.status_name}}    卖车时间：{{item.sold_at}}</p>
          </div>
        </div>
      </div>
    </el-dialog>
 </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  filters: {
    numToWan: val => val ? (val / 10000).toFixed(2) : '--',
    fenToWan: val => val ? (val / 1000000).toFixed(2) : '--',
  }
})
export default class RefPrice extends Vue {
  @PropSync('visible', { type: Boolean }) dialogVisible!: boolean
  @Prop(Number) readonly id: number
  @Prop(Number) readonly source: number
  @Prop(Number) readonly store_id: number
  @State('group') groupInfo

  refPriceParams = {
    view_same_city: false,
    the_same_year: false,
    source: this.source,
    id: this.id,
    store_id: this.store_id,
    page: 1,
    count: 10
  }
  carInfo = null
  selectedCar = null
  refCars = []
  isNomore = false
  isLoading = false

  @Watch('dialogVisible')
  onVisibleChange(val) {
    if (val) {
      this.resetParams()
      this.getRefPrice('init')
    }
  }

  async getRefPrice(type = '') {
    if (this.isLoading) return
    if (this.isNomore) return
    if (type !== 'init') {
      this.refPriceParams.page += 1
    }
    this.isLoading = true
    const { code, data } = await this.$rest.usedCar.getRefPriceInfo({
      ...this.refPriceParams,
      view_same_city: +this.refPriceParams.view_same_city,
      the_same_year: +this.refPriceParams.the_same_year
    })
    this.isLoading = false
    if (code === 0) {
      const {
        page,
        count,
        total_count,
        car_info,
        selected_car,
        reference_cars
      } = data
      this.carInfo = car_info
      this.selectedCar = selected_car
      if (this.selectedCar !== null) {
        (this.selectedCar as any).is_our_group = (this.selectedCar as any).refer_group_id === this.groupInfo.id;
      }
      const refarr = reference_cars.map(item => ({
        ...item,
        is_our_group: item.refer_group_id === this.groupInfo.id
      }))
      this.refCars = this.refCars.concat(refarr)
      if (page * count >= total_count) {
        this.isNomore = true
      }
    } else if (this.refPriceParams.page > 1) {
      this.refPriceParams.page -= 1
    }
  }

  resetParams() {
    this.refPriceParams = {
      view_same_city: false,
      the_same_year: false,
      source: this.source,
      id: this.id,
      store_id: this.store_id,
      page: 1,
      count: 10
    }
    this.carInfo = null
    this.selectedCar = null
    this.refCars = []
    this.isNomore = false
  }

  handleLoadMore() {
    this.getRefPrice()
  }

  handleReload() {
    this.refPriceParams.page = 1;
    this.isNomore = false;
    this.refCars = [];
    this.getRefPrice('init')
  }
}
</script>

<style lang="less">
.refPrice {
  .el-dialog__body {
    max-height: none;
  }
}
</style>
<style lang="less" scoped>
.refPrice {
  .ellipsis {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin: 0;
  }
  .moreinfo {
    position: relative;
    margin-top: -25px;
  }
  .refprice-dialog {
    &-car {
      background-color: #f1f8ff;
    }
    &-item {
      padding-top: 12px;
      padding-bottom: 12px;
      display: flex;
      align-items: center;

      &__left {
        display: inline-block;
        width: 96px;
        height: 65px;
        margin-left: 10px;
        margin-right: 12px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url('../assets/styles/images/viewCarLimit.jpg')
      }
      &__right {
        display: inline-block;
        height: 65px;
        width: calc(100% - 118px);
        &-title {
          font-size: 14px;
          color: #333;
          line-height: 30px;
        }
        &-info {
          font-size: 12px;
          color: #989ea9;
          line-height: 19px;
        }
      }
    }
    &-refprice {
      padding-top: 12px;
      padding-bottom: 12px;
      &__top {
        margin-bottom: 10px;
        font-size: 12px;
        color: #333;
      }
      &__bottom {
        position: relative;
      }
      &__info {
        display: flex;
        align-items: center;
      }
      &__logo {
        margin-right: 12px;
        width: 70px;
        height: 70px;
        background: url('../assets/styles/images/refPrice.png') no-repeat center center;
        background-size: contain;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    &-search {
      height: 38px;
      display: flex;
      align-items: center;
      background-color: #f4f4f4;
      padding-left: 10px;
      &-title {
        margin-right: 15px;
        font-size: 10px;
        font-weight: bold;
      }
    }
    &-others {
      height: 280px;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 1px;
      }
      .refprice-dialog-item {
        background-color: #f4f4f4;
        border-top: 1px solid #d9d9d9;
      }
    }
  }
}
</style>
