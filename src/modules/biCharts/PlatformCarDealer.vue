<template>
  <section class="car-dealer">
    <top-title @handleFullScreen="handleFullScreen" sessionName="" :title="reportName" summaryName="" />
    <div class="car-dealer__container">
      <div class="car-dealer__box">
        <funnel
          :title="funnelChartTitle"
          :option="funnelOptions"
          :loading="loading"
        />
        <bar-line
          :title="carDealersTypesTitle"
          :option="typesOptions"
          :loading="loading"
        />
        <multi-charts
          title="新增车商数据（月累计）"
          :options="newCarDealerData"
          :loading="loading"
        />
      </div>
      <div class="car-dealer__box">
        <div class="car-dealer__map-box">
          <top-data :mapData="topDataList" />
          <Map ref='map' :option="centerMap" />
          <template v-if='!isShow'>
            <div
              class='car-dealer__map-box__top-five'
              v-for='block in cityDataOptions'
              :key='block.style.left'
              :style='block.style'
            >
              <template v-if='block.data'>
                <div class='name'>{{ block.data.name || '--' }}</div>
                <div class='count'>{{ block.data.valid_dealer || 0 }}，{{ block.data.active_dealer || 0 }}</div>
              </template>
            </div>
          </template>
          <div class='car-dealer__map-box__control-bar'>
            <switch-control-bar
              :title='sessionName'
              :bool="!!timer"
              @handleChangeSession="handleChangeProvinces"
              @handleTriggerAuto="handleTriggerAuto"
            />
          </div>
        </div>
        <div class='car-dealer__invite-ranking'>
          <bar-line
            title="邀约车商数TOP10经销店（历史累计）"
            :option="inviteRanking"
            :loading="loading"
            :mask-style='inviteRankingMaskCss'
            @click='handleRankingClick'
          >
            <template v-slot:others>
              <div class='invite-ranking__table-wrapper'>
                <div class='invite-ranking__table'>
                  <div class='header' v-if='inviteRankingTableData.length'>
                    <div
                      v-for='item in inviteRankingHeader'
                      :key='item'
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div
                    v-for='(row, index) in inviteRankingTableData'
                    :class='[
                "content",
                index % 2 ? "content--light" : "content--dark"
              ]'
                    :key='row.name'
                  >
                    <div
                      v-for='prop in inviteRankingTableProps'
                      class='row'
                      :key='row + prop'
                    >
                      {{ row[prop] }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </bar-line>
        </div>
      </div>
      <div class="car-dealer__box">
        <multi-charts
          title="平台车商月活跃情况（月累计）"
          :options="monthlyActivity"
          :loading="loading"
          :box-style='monthlyActivityBoxCss'
          :mask-style='monthlyActivityMaskCss'
        />
        <bar-line
          title="活跃预警经销店（月累计）"
          :option="activeAlertData"
          :loading="loading"
        />
      </div>
    </div>
  </section>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import * as echarts from 'echarts'
import Funnel from './components/Funnel.vue'
import BarLine from './components/BarLine.vue'
import MultiCharts from './components/MultiCharts.vue';
import SwitchControlBar from './components/SwitchControlBar.vue';
import TopTitle from './components/TopTitle.vue'
import TopData from './components/TopData.vue'
import MapTable from './components/MapTable.vue'
import MapTips from './components/MapTips.vue'
import Map from './components/Map.vue'
import { activeAlertOptions } from './configs/carDealer/activeAlert';
import { carDealerTypesOptions } from './configs/carDealer/carDealerTypes';
import { cityDataBasic, specialProvincesBasic } from './configs/carDealer/cityData';
import { carDealerOptions } from './configs/carDealer/funnel';
import { inviteRankingMaskCss, inviteRankingOptions } from './configs/carDealer/inviteRanking';
import CarDealerBIMixin from './configs/carDealer/mixin';
import { monthlyActivityBottom, monthlyActivityBoxCss, monthlyActivityMaskCss, monthlyActivityTop } from './configs/carDealer/monthlyActivity';
import { newCarDealerLeft, newCarDealerRight } from './configs/carDealer/newCarDealer';

@Component({
  components: {
    SwitchControlBar,
    BarLine,
    TopTitle,
    TopData,
    MapTable,
    MapTips,
    Map,
    Funnel,
    MultiCharts
  },
})
export default class PublicSession extends Mixins(CarDealerBIMixin) {
  private reportName = '车商数据监控'
  private counter = 30000
  private timer = null
  private loading = false // 冗余的图表loading
  private currentIndex = -1
  private sessionName = '广深场'

  private funnelOptions: any = {}

  private centerMap: any = {}

  private inviteRanking: any = {}
  private inviteRankingMaskCss = inviteRankingMaskCss
  private inviteRankingHeader = ['类型', '车商数量', '本月活跃', '本月中标']
  private inviteRankingTableProps = ['type', 'valid_dealer', 'active_dealer', 'winning_dealer']
  private inviteRankingTableData = []
  private inviteRankingCurrent = 0

  private typesOptions: any = {}

  private newCarDealerData: any = []

  private monthlyActivity: any = {}
  private monthlyActivityBoxCss = monthlyActivityBoxCss
  private monthlyActivityMaskCss = monthlyActivityMaskCss

  private activeAlertData: any = {}

  private topDataList = [
    {
      title: '邀约经销店数',
      value: 0,
      dataKey: 'invite_store'
    },
    {
      title: '经销店邀约率',
      value: 0,
      percent: true,
      dataKey: 'invite_stores_rate'
    },
    {
      title: '店均邀约数',
      value: 0,
      dataKey: 'avg_invited_dealer'
    }
  ]

  private topProvinces: Array<{code: string, name: string}> = [{code: '100000', name: '全国'}]
  private cityDataOptions = []
  private isShow = false

  // 漏斗图 / 招募车商类型分布图 报表前缀
  private chartTitle = '集团'

  get funnelChartTitle () {
    return `${this.chartTitle}招募车商转化漏斗（月累计）`
  }

  get carDealersTypesTitle() {
    return `${this.chartTitle}招募车商类型分布（历史累计）`
  }

  async mounted () {
    this.setFontSize()
    this.handleChangeProvinces(true)
    this.handleSetTimer()
  }

  async fetchData () {
    // this.topProvinces = await this.getTopProvinces()
    // 此处判断 topProvinces 长度，防止获取公开场次的时候，登录态刚好过期
    // 因此，刚好碰到登录态过期，场次切换将会被延迟一分钟切换
    // if (this.topProvinces.length) {
    //   this.handleChangeProvinces(true)
    // }
  }

  // 获取topN省份
  async getTopProvinces () {
    const { code = -1, data = {} } = await this.$rest.biCharts.getTopProvinces() || {}
    if (code !== 0) return []
    return data
  }

  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }

  // 省份切换
  async handleChangeProvinces (bool) {
    if (this.isShow) return
    this.isShow = true
    const loadingInstance = this.$loading({
      target: document.querySelector('.car-dealer') as any,
      background: 'rgba(0, 0, 0, 0.7)',
      spinner: 'el-icon-loading'
    })
    const lens = this.topProvinces.length
    this.currentIndex = bool ? (this.currentIndex + 1) % lens : (this.currentIndex - 1 + lens) % lens
    const { code: provinceCode, name } = this.topProvinces[this.currentIndex]

    if (provinceCode !== '100000' && !this.specialProvinces.includes(name)) {
      const getMapGeoResult = await this.getProvinceGeo(provinceCode, name)
      if (!getMapGeoResult) return
    } else {
      this.initCenterMap('CHINA', this.CHINA_GEO)
    }

    // const { code = -1, data = {} } = await this.$rest.biCharts.getProvinceData({
    //   province_code: provinceCode
    // }) || {}
    // if (code !== 0) return

    const data = {
      activity_warming_stores: [],
      dealer_activity_statistics: {
        active_dealers: [16, 19, 18, 0],
        active_rates: [81.2, 94.7, 94.4, 0],
        avg_auction_cars: [0.04, 0.02, 0.01, 0],
        avg_participating_cars: [5.3, 24.6, 27.1, 0],
        avg_winning_cars: [2.3, 10.3, 6.2, 0],
        dates: ['02月', '03月', '04月', '05月'],
        login_dealers: [26, 35, 35, 0],
        login_rates: [80.8, 97.1, 97.1, 0],
        winning_dealers: [12, 14, 15, 0],
        winning_rates: [83.3, 100, 93.3, 0]
      },
      dealer_type_distribution: {
        A: [21, 32, 34, 0],
        A1: [1.3, 1.8, 1.8, 0],
        A2: [0.7, 1.4, 0.9, 0],
        A3: [1.1, 1.1, 1.8, 0],
        B: [14, 4, 7, 0],
        C: [35, 40, 36, 0],
        D: [38, 38, 38, 0],
        E: [642, 645, 670, 0],
        dates: ['02月', '03月', '04月', '05月']
      },
      global_data: {
        avg_invited_dealer: 0,
        invite_store: 0,
        invite_stores_rate: 0,
        province_code: '100000',
        province_name: '全国',
        report_chart_title: '中升集团',
        report_name: '车商数据监控',
        top5_cities: []
      },
      new_dealer_statistics: {
        activity_rates: [50, 55.6, 3.7, 0],
        avg_participating_cars: [1, 40.4, 48, 0],
        avg_winning_cars: [0, 17, 28, 0],
        dates: ['02月', '03月', '04月', '05月'],
        new_dealers: [2, 9, 27, 0]
      },
      top10_stores: {
        merged_store: {
          table: [
            {active_dealer: 0, type: "A1", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "A2", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "A3", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "B", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "C", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "D", valid_dealer: 0, winning_dealer: 0},
            {active_dealer: 0, type: "E", valid_dealer: 0, winning_dealer: 0}
          ]
        },
        stores: []
      },
      transformation_funnel:{
        conversion_rates: [
          {name: "登入转化率", value: 0},
          {name: "登入浏览转化率", value: 0},
          {name: "浏览参拍转化率", value: 0},
          {name: "参拍中标转化率", value: 0}
        ],
        dealer_counts: [
          {name: "有效车商", value: 0},
          {name: "登入车商", value: 0},
          {name: "浏览车商", value: 0},
          {name: "参拍车商", value: 0},
          {name: "中标车商", value: 0}
        ],
        monthly_growth_rates: [
          {name: "有效车商同比增长率", value: -100},
          {name: "登入车商同比增长率", value: -100},
          {name: "浏览车商同比增长率", value: -100},
          {name: "参拍车商同比增长率", value: -100},
          {name: "中标车商同比增长率", value: -100}
        ]
      }
    }

    this.initGlobalData(data.global_data)
    this.initFunnel(data.transformation_funnel)
    this.initNewCarDealerData(data.new_dealer_statistics)
    this.initCarDealerTypes(data.dealer_type_distribution)
    this.initInviteRanking(data.top10_stores.stores)
    this.initTotalInviteRanking(data.top10_stores.merged_store.table)
    this.initMonthlyActivity(data.dealer_activity_statistics)
    this.initActiveAlert(data.activity_warming_stores)

    // 关闭 loading 效果
    this.$nextTick(() => {
      this.isShow = false
      loadingInstance.close()
    })
  }

  async getProvinceGeo (area_code, title) {
    const { code = -1, data = {} } = await this.$rest.biCharts.getMapGeo({
      area_code: area_code
    }) || {}
    if (code !== 0) return false

    this.initCenterMap(title, data)
    return true
  }

  /**
   * 初始化中央地图
   * @param title 地图标题
   * @param data 地图geo数据
   */
  initCenterMap(title, data) {
    echarts.registerMap(title, data);
    this.centerMap = {
      geo: {
        show: true,
        map: title,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        selectedMode: false,
        roam: false,
        itemStyle: {
          normal: {
            borderWidth: 4, //设置外层边框
            borderColor: '#0CF9FF',
            areaColor: '#100B2A',
            label: { show: false }
          },
          emphasis: {
            borderWidth: 4,
            borderColor: '#0CF9FF',
            areaColor: '#100B2A',
            label: { show: false }
          }
        }
      },
      series: [
        {
          name: title,
          type: 'map',
          mapType: title,
          label: {
            show: false,
          },
          selectedMode: false,
          itemStyle: {
            normal: {
              areaColor: '#100B2A',
              label: { show: false }
            },
            emphasis: {
              areaColor: '#100B2A',
              label: { show: false }
            },
          },
          data: []
        }
      ]
    };
  }

  // 城市轮播自动切换暂停和开启操作
  handleTriggerAuto() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    } else {
      this.handleSetTimer()
    }
  }

  // 轮播定时器
  async handleSetTimer() {
    clearTimeout(this.timer)
    await this.fetchData()
    this.timer = setTimeout(this.handleSetTimer, this.counter)
  }

  // 初始化展示数据
  initGlobalData (data) {
    const {
      province_code: code, // 行政区域编号
      province_name: name, // 行政区域名称
      report_name: reportName, // 标题名称
      report_chart_title: chartTitle, // 可配置图表名称
      top5_cities // 当前省份top5城市
    } = data || {}

    this.sessionName = name
    this.reportName = reportName || '车商数据监控'
    this.chartTitle = chartTitle || '集团'
    this.topDataList = this.topDataList.map(
      (item) => ({ ...item, value: data[item.dataKey] })
    )

    if (code === '100000' || !this.specialProvinces.includes(name)) {
      this.cityDataOptions = top5_cities.map(
        (item, index) => ({ data: item, style: cityDataBasic[index].style })
      )
      this.centerMap.series[0].data = code === '100000'
        ? []
        : top5_cities.map(
          (item)=> ({
            name: item.name,
            itemStyle: this.highlightItem
          })
        )
    } else {
      this.centerMap.series[0].data = [{ name, itemStyle: this.highlightItem }]
      this.cityDataOptions = [{
        data: {
          ...top5_cities[0],
          name,
        },
        ...specialProvincesBasic
      }]
    }
  }

  // 初始化邀约车商表格数据
  initTotalInviteRanking (data) {
    this.inviteRankingCurrent = 0
    this.inviteRankingTableData = data
  }

  // 转化漏斗图
  initFunnel (data) {
    this.funnelOptions = carDealerOptions(data)
  }

  // 邀约车商数TOP10经销店图
 initInviteRanking (data) {
  this.inviteRanking = inviteRankingOptions(data, this.fontSize)
 }

  // 招募车商类型分布图
  initCarDealerTypes (data) {
    this.typesOptions = carDealerTypesOptions(data, this.fontSize)
  }

  // 新增车商数据图
  initNewCarDealerData (data) {
    this.newCarDealerData = [
      newCarDealerLeft(data, this.fontSize),
      newCarDealerRight(data, this.fontSize)
    ]
  }

  // 平台车商月活跃情况图
  initMonthlyActivity (data) {
    this.monthlyActivity = [
      monthlyActivityTop(data, this.fontSize),
      monthlyActivityBottom(data, this.fontSize)
    ]
  }

  // 活跃预警经销店图
  initActiveAlert (data) {
    this.activeAlertData = activeAlertOptions(data, this.fontSize)
  }

  // 玫瑰图点击展示对应门店数据
  handleRankingClick (e) {
    const { id, table } = e.data
    if (id === this.inviteRankingCurrent) return
    this.inviteRankingCurrent = id
    this.inviteRankingTableData = table
  }
}
</script>
<style lang="less">
.car-dealer {
  height: 100vh;
  width: 100vw;
  background: #100B2A!important;

  .el-loading-spinner {
    font-size: 35px;
  }

  &__container {
    display: flex;
    width: fit-content;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  &__box {
    display: flex;
    background: #100B2A;
    width: calc((100vw - 10px) / 3);
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__map-box {
    position: relative;
    width: 100%;
    height: 60vh;

    &__top-five {
      position: absolute;
      background-size: 100% 100%;
      padding: 10px;
      color: #fff;
      box-sizing: border-box;
      width: 113.4px;

      .name {
        font-size: 13px;
        font-weight: bold;
      }

      .count {
        margin-top: 5px;
        font-weight: lighter;
        font-size: 12px;
      }
    }

    &__control-bar {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 180px;
    }
  }

  .pie-title {
    position: absolute;
    z-index: 2;
    top: 28%;
    left: 50%;
    transform: translateX(-49%);
    width: 85%;
    height: 30px;
    display: flex;
    justify-content: space-around;

    &__close, &__dispute {
      width: 2.5rem;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: rgba(5, 14, 59, 0.9);
      box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.2);
      font-size: .12rem;
      color: #ffffff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 10px;
    }

    &__close {
      margin-right: 10px;
    }

    &__dispute {
    }

    &__hightlight {
      color: #0CF9FF;
      font-size: .14rem;
    }
  }

  &__invite-ranking {
    .bar-line {
      width: 100%;
      height: 95%;
    }
  }

  .invite-ranking {
    &__table-wrapper {
      width: 88%;
      height: 80%;
      display: flex;
      align-items: center;
    }

    &__table {
      width: 100%;
      max-height: 100%;
      overflow: auto;

      .rows {
        color: #fff;
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: repeat(4, 25%);
        line-height: 28px;
        font-size: 12px;
      }

      .header {
        .rows;
        justify-items: center;
        background: #20455d;
      }

      .content {
        .rows;

        &--light {
          background: #14223d;
        }

        &--dark {
          background: #111632;
        }
      }

      .row {
        padding-left: 12px;
      }
    }
  }
}
</style>
