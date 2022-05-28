<template>
  <section class="map-tips" :style="cssStyle">
    <div class="map-tips__name">{{ sessionName }}</div>
    <div class="map-tips__data">{{ sessionAuctions }}，{{ sessionAuctionRate }}</div>
  </section>
</template>

<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopData extends Vue {
  @Prop({default: '河南专场'}) readonly sessionName: string
  @Prop({default: 5000}) readonly sessionAuctions: number
  @Prop({default: '70.0%'}) readonly sessionAuctionRate: string
  @Prop({default: () => ({})}) readonly cssStyle: any
}
</script>

<style lang="less">
.map-tips {
  position: absolute;
  left: 41.3%;
  top: 28%;
  width: 100px;
  z-index: 2;
  height: 51px;
  margin-top: 20px;
  background-color: #0a1934;
  box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
  border: solid 1px #0cf9ff;
  color: #fff;
  padding: 5px;

  &__name {
    text-align: center;
    line-height: 25px;
    font-size: 14px;
	  color: #ffffff;
  }

  &__data {
    text-align: center;
    font-size: 11px;
	  color: #ffffff;
  }
}
</style>
