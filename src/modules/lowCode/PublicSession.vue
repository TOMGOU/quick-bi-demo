<template>
  <section class="public-session">
    <top-title @handleFullScreen="handleFullScreen" :sessionName="sessionName"></top-title>
    <div class="public-session__container">
      <div class="public-session__box">
        <bar-line :option="option1" :loading="loading" title="日拍卖趋势图"></bar-line>
        <bar-line :option="option4" :loading="loading" title="周成交趋势图"></bar-line>
        <bar-line :option="option5" :loading="loading" title="月成交趋势图"></bar-line> 
      </div>
      <div class="public-session__box">
        <div class="public-session__map-box">
          <top-data :mapData="mapData"></top-data>
          <Map :option="option2"></Map>
          <map-tips :sessionName="sessionName" :sessionAuctions="sessionAuctions" :sessionAuctionRate="sessionAuctionRate"></map-tips>
          <map-table :tableData="tableData" :sessionName="sessionName" :bool="!!timer" @handleChangeSession="handleChangeSession" @handleTriggerAuto="handleTriggerAuto"></map-table>
        </div>
        <bar-line :option="option3" :loading="loading" title="关闭订单及争议订单">
          <div class="pie-title" v-if="!loading">
            <div class="pie-title__close">关单数 <span class="pie-title__hightlight">{{ closedOrder }}单</span> | 同比增长 <span class="pie-title__hightlight">{{ closedOrderGrowthRate }}%</span></div>
            <div class="pie-title__dispute">争议数 <span class="pie-title__hightlight">{{ arguedOrder }}单</span> | 同比增长 <span class="pie-title__hightlight">{{ arguedOrderGrowthRate }}%</span></div>
          </div>
        </bar-line>
      </div>
      <div class="public-session__box">
        <bar-line :option="option6" :loading="loading" title="周毛利、毛利率趋势图"></bar-line>
        <bar-line :option="option8" :loading="loading" title="月毛利、毛利率趋势图"></bar-line>
        <bar-line :option="option7" :loading="loading" title="车商活跃趋势图"></bar-line>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'
import BarLine from './components/charts/BarLine.vue'
import TopTitle from './components/basics/TopTitle.vue'
import TopData from './components/basics/TopData.vue'
import MapTable from './components/basics/MapTable.vue'
import MapTips from './components/basics/MapTips.vue'
import Map from './components/charts/Map.vue'
const china = require('./map/china.json')

const myItemStyle = {
  normal: {
    areaColor: '#ffde81', // #554E3E
    color: "#ffde81",
    borderColor: "#ffde81",
    borderWidth: 0,
    borderType: "solid",
    label: { show: false }
  },
  emphasis: {
    areaColor: '#ffde81',
    color: "#ffde81",
    borderColor: "#ffde81",
    borderWidth: 0,
    borderType: "solid",
    label: { show: false }
  },
}

@Component({
  components: {
    chart: eCharts,
    BarLine,
    TopTitle,
    TopData,
    MapTable,
    MapTips,
    Map
  },
})
export default class PublicSession extends Vue {
  @Mutation('UPDATE_NAV') updateNav
  @Mutation('UPDATE_CRUMB') hideCrumb
  private counter = 30000
  private fontSize = 12
  private timer = null
  private loading = true
  private currentIndex = 0
  private sessionName = '--'
  private sessionAuctions = 0
  private sessionAuctionRate = '0%'
  private mapHLData = []
  private option1: any = {}
  private option2: any = {}
  private option3: any = {}
  private option4: any = {}
  private option5: any = {}
  private option6: any = {}
  private option7: any = {}
  private option8: any = {}
  private theme = require('./theme/index.json')
  private mapData: any = [
    {
      title: '今日上拍量',
      value: 0
    },
    {
      title: '今日店均上拍量',
      value: 0
    },
    {
      title: '本月上拍台数',
      value: 0
    },
    {
      title: '本月店均成交台数',
      value: 0
    },
  ]
  private tableData: any = [
    {
      store_name: '--',
      auctions: '0',
      auction_rate: '0%'
    },
    {
      store_name: '--',
      auctions: '0',
      auction_rate: '0%'
    },
    {
      store_name: '--',
      auctions: '0',
      auction_rate: '0%'
    },
    {
      store_name: '--',
      auctions: '0',
      auction_rate: '0%'
    },
    {
      store_name: '--',
      auctions: '0',
      auction_rate: '0%'
    },
  ]
  private sessions = []
  private closedOrder = 0
  private closedOrderGrowthRate = '--'
  private arguedOrder = 0
  private arguedOrderGrowthRate = '--'

  async mounted () {
    this.setFontSize()
    this.initOption1()
    this.initOption2()
    this.initOption3()
    this.initOption4()
    this.initOption5()
    this.initOption6()
    this.initOption7()
    this.initOption8()
    // await this.fetchData()
    // this.timer = setInterval(this.fetchData, 60000)
    // this.handleSetTimer()
  }

  async fetchData () {
    this.sessions = await this.getPublicSession()
      // 此处判断 sessions 长度，防止获取公开场次的时候，登录态刚好过期
      // 因此，刚好碰到登录态过期，场次切换将会被延迟一分钟切换
      if (this.sessions.length) {
        this.handleChangeSession(true)
      }
  }

  /**
   * 获取公开场次
   */
  async getPublicSession () {
    const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.getPublicSession() || {}
    if (code !== 0) return []
    return data.session_tmpls
  }

  /**
   * 设置字体大小
   */
  setFontSize () {
    this.fontSize = window.screen.width > 1600 ? 12 : 10
  }

  /**
   * 页面销毁事件
   */
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }

  /**
   * 页面全屏事件
   */
  handleFullScreen () {
    if (!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
      const docs = document.documentElement as any;
      const rfs = docs.requestFullscreen || docs.webkitRequestFullScreen || docs.mozRequestFullScreen || docs.msRequestFullscreen;
      rfs.call(docs);
      this.toggleNavCrumb(true)
    } else {
      const rfs = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
      rfs.call(document);
      this.toggleNavCrumb(false)
    }
  }

  /**
   * 切换导航栏和面包屑的显示隐藏
   */
  toggleNavCrumb (bool) {
    this.updateNav(bool)
    this.hideCrumb(bool)
  }

  /**
   * 场次切换
   */
  async handleChangeSession (bool) {
    const lens = this.sessions.length
    this.currentIndex = bool ? (this.currentIndex + 1) % lens : (this.currentIndex - 1 + lens) % lens
    this.sessionName = this.sessions[this.currentIndex].name
    
    const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.getPublicSessionData({ id: this.sessions[this.currentIndex].id }) || {}
    if (code !== 0) return

    // 中央地图数据更新
    this.sessionAuctions = data.global_auctions.session_auctions
    this.sessionAuctionRate = data.global_auctions.session_auction_rate + '%'
    this.option2.series[0].data = data.global_auctions.provinces.map(item => ({name: item, itemStyle: myItemStyle}))
    this.mapData = [
      {
        title: '今日上拍量',
        value: data.global_auctions.today_auctions
      },
      {
        title: '今日店均上拍量',
        value: data.global_auctions.today_auctions_per_store
      },
      {
        title: '本月上拍台数',
        value: data.global_auctions.month_auctions
      },
      {
        title: '本月店均成交台数',
        value: data.global_auctions.month_transactions_per_store
      },
    ]
    this.tableData = data.global_auctions.top5

    // 日拍趋势图数据更新
    this.option1.xAxis.data = data.daily_auctions_trend.dates
    this.option1.series[0].data = data.daily_auctions_trend.auctions
    this.option1.series[1].data = data.daily_auctions_trend.solds
    this.option1.series[2].data = data.daily_auctions_trend.sold_rates

    // 关闭订单及争议订单图数据更新
    this.closedOrder = data.closed_and_argued_orders.closed_order.total
    this.closedOrderGrowthRate = data.closed_and_argued_orders.closed_order.growth_rate
    this.arguedOrder = data.closed_and_argued_orders.argued_order.total
    this.arguedOrderGrowthRate = data.closed_and_argued_orders.argued_order.growth_rate
    this.option3.series[0].data[0].value = data.closed_and_argued_orders.closed_order.closed_rate
    this.option3.series[1].data = [
      {value: data.closed_and_argued_orders.argued_order.in_process_orders, name: '处理中'},
      {value: data.closed_and_argued_orders.argued_order.support_dealer_orders, name: '支持车商'},
      {value: data.closed_and_argued_orders.argued_order.support_store_orders, name: '支持经销店'},
    ]

    // 周成交趋势图数据更新
    this.option4.xAxis.data = data.weekly_transactions_trend.dates
    this.option4.series[0].data = data.weekly_transactions_trend.auctions
    this.option4.series[1].data = data.weekly_transactions_trend.solds
    this.option4.series[2].data = data.weekly_transactions_trend.transactions
    this.option4.series[3].data = data.weekly_transactions_trend.transaction_rates

    // 月成交率趋势图数据更新
    this.option5.xAxis.data = data.monthly_transactions_trend.dates
    this.option5.series[0].data = data.monthly_transactions_trend.auctions
    this.option5.series[1].data = data.monthly_transactions_trend.solds
    this.option5.series[2].data = data.monthly_transactions_trend.matches
    this.option5.series[3].data = data.monthly_transactions_trend.transaction_rates

    // 周毛利、毛利率趋势图数据更新
    this.option6.xAxis.data = data.weekly_gross_profit_and_rate_trend.dates
    this.option6.series[0].data = data.weekly_gross_profit_and_rate_trend.gross_profits
    this.option6.series[1].data = data.weekly_gross_profit_and_rate_trend.gross_profit_rates
    this.option6.series[2].data = data.weekly_gross_profit_and_rate_trend.month_gross_profit_rates

    // 车商活跃趋势图数据更新
    this.option7.xAxis.data = data.dealers_activity_trend.dates
    this.option7.series[0].data = data.dealers_activity_trend.monthly_visitors
    this.option7.series[1].data = data.dealers_activity_trend.monthly_participants
    this.option7.series[2].data = data.dealers_activity_trend.monthly_bidders
    this.option7.series[3].data = data.dealers_activity_trend.weekly_visitors
    this.option7.series[4].data = data.dealers_activity_trend.weekly_participants
    this.option7.series[5].data = data.dealers_activity_trend.weekly_bidders

    // 月成交率趋势图数据更新
    this.option8.yAxis.data = data.monthly_gross_profit_and_rate_trend.dates
    this.option8.series[0].data = data.monthly_gross_profit_and_rate_trend.gross_profits
    this.option8.series[1].data = data.monthly_gross_profit_and_rate_trend.gross_profit_rates

    // 关闭 loading 效果
    this.loading = false
  }

  /**
   * 场次自动切换暂停和开启操作
   */
  handleTriggerAuto() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    } else {
      this.handleSetTimer()
    }
  }

  /**
   * 当为公开场时，定时器间隔时间为 60 秒，其他场次为 30 秒
   */
  async handleSetTimer() {
    clearTimeout(this.timer)
    await this.fetchData()
    console.log({id: this.sessions[this.currentIndex].id, counter: this.counter})
    this.counter = this.sessions[this.currentIndex].id ? 30000 : 60000
    this.timer = setTimeout(this.handleSetTimer, this.counter)
  }

  /**
   * 日拍趋势图
   */
  initOption1 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148'];
    this.option1 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['11.19', '11.20', '11.21', '11.22', '11.23', '11.24', '11.25'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .6)"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        },
        {
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {  
            show: false,
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台次', icon: 'rect' }, 
          { name: '拍出台次', icon: 'rect' }, 
          { name: '台次拍出率' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          name: '上拍台次',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [10, 20, 50, 80, 170, 180, 30],
          name: '拍出台次',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
          itemStyle: {
            color: '#ff5a5a'
          }
        },
        {
          name: '台次拍出率',
          type: 'line',
          symbolSize: 6,
          color: ['#ffc148'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#ffc148'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 193, 72, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(255, 193, 72, 0.1)'
            }])
          },
          data: [120, 120, 150, 180, 170, 110, 130],
          label: {
            show: true,
            position: 'top',
            formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ffc148',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        }
      ]
    }
  }

  /** 
   * 中央地图
  */
  initOption2 () {
    echarts.registerMap('CHINA', china);

    this.option2 = {
      geo: {
        show: true,
        map: 'CHINA',
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
          name: '中国地图',
          type: 'map',
          mapType: 'CHINA',
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
          data: this.mapHLData
        }
      ]
    };
  }

  /** 
   * 关闭订单及争议订单饼图
  */
 initOption3 () {
  this.option3 = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // orient: 'horizontal',
      top: '44%',
      left: '83%',
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      width: 10,
      textStyle: {
        color: '#fff',
        fontSize: this.fontSize
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['25%', '60%'],
        radius: '70%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#0CF9FF'],
              [0.7, '#4992ff'],
              [1, '#ff5a5a']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -15,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitLine: {
          distance: -15,
          length: 15,
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 20,
          fontSize: 6
        },
        title: {
          show : true,
          offsetCenter: [0, '75%'],
          textStyle: {
            fontSize: this.fontSize,
            color: '#ff5a5a'
          }
        },
        detail: {
          valueAnimation: true,
          formatter: value => value === 0 ? `${value}%` : `${value.toFixed(1)}%`,
          textStyle:{
            fontSize: this.fontSize,
            color: '#ff5a5a'
          },
          offsetCenter: [0, "50%"],
        },
        data: [{
          value: 70,
          name: '关单率',
        }]
      },
      {
        name: '争议订单',
        type: 'pie',
        center: ['68%', '60%'],
        radius: ['35%', '70%'],
        color: ['#ffc148', '#4992ff', '#0CF9FF'],
        data: [
          {
            value: 10, 
            name: '处理中'
          },
          {
            value: 5,
            name: '支持经销店'
          },
          {
            value: 10,
            name: '支持车商'
          },
        ],
        itemStyle: {
          color: '#ff5a5a',
          normal: {
            label: {
              textStyle: {
                color: '#000',
              }
            }
          },
        },
        label: {
          show: true,
          color: '#fff',
          normal: {
            formatter: '{c}',
            position:'inside'
          },
          itemStyle: {
            color: '#ff5a5a'
          }
        },
      }
    ]
  }
 }

  /**
   * 周成交趋势图
   */
  initOption4 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '4992ff'];
    this.option4 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['10.14-10.20', '10.21-10.27', '10.28-11.04', '11.04-11.11'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .8)"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        },
        {
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            show: false,
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台数', icon: 'rect' }, 
          { name: '拍出台数', icon: 'rect' }, 
          { name: '成交台数', icon: 'rect' }, 
          { name: '成交率' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 150, 80],
          name: '上拍台数',
          type: 'bar',
          barWidth: '10%',
          yAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [20, 50, 80, 170],
          name: '拍出台数',
          type: 'bar',
          barWidth: '10%',
          yAxisIndex: 0,
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
          itemStyle: {
            color: '#ff5a5a'
          }
        },
        {
          data: [20, 50, 80, 170],
          name: '成交台数',
          type: 'bar',
          barWidth: '10%',
          yAxisIndex: 0,
          showBackground: false,
          backgroundStyle: {
            color: '#ffc148'
          },
          itemStyle: {
            color: '#ffc148'
          }
        },
        {
          name: '成交率',
          type: 'line',
          symbolSize: 6,
          color: ['#4992ff'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#4992ff'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(58, 77, 233, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(58, 77, 233, 0.1)'
            }])
          },
          data: [120, 120, 150, 170],
          label: {
            show: true,
            position: 'top',
            formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff',
            },
          },
        }
      ]
    }
  }

  /**
   * 月成交率趋势图
   */
  initOption5 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
    this.option5 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['8月', '9月', '10月', '11月'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .8)"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        },
        {
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            show: false,
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台数', icon: 'rect' }, 
          { name: '拍出台数', icon: 'rect' }, 
          { name: '撮合台数', icon: 'rect' }, 
          { name: '成交率' },
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 180, 200],
          name: '上拍台数',
          type: 'bar',
          barWidth: '15%',
          yAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '拍出台数',
          type: 'bar',
          stack: 'Ad',
          barWidth: '15%',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
          itemStyle: {
            color: '#ff5a5a'
          },
          data: [120, 132, 101, 150]
        },
        {
          name: '撮合台数',
          type: 'bar',
          stack: 'Ad',
          barWidth: '15%',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          backgroundStyle: {
            color: '#ffc148'
          },
          itemStyle: {
            color: '#ffc148'
          },
          data: [220, 182, 191, 200]
        },
        {
          name: '成交率',
          type: 'line',
          symbolSize: 6,
          color: ['#4992ff'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#4992ff'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(58, 77, 233, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(58, 77, 233, 0.1)'
            }])
          },
          data: [20, 120, 150, 200],
          label: {
            show: true,
            position: 'top',
            formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff',
            },
          },
        }
      ]
    }
  }

  /**
   * 周毛利、毛利率趋势图
   */
  initOption6 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ff5a5a'];
    this.option6 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['10.14-10.20', '10.21-10.27', '10.28-11.04', '11.04-11.11'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .8)"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        },
        {
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            show: false,
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '毛利', icon: 'rect' }, 
          { name: '毛利率' },
          { name: '月毛利率' },
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 150, 80],
          name: '毛利',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '毛利率',
          type: 'line',
          symbolSize: 6,
          color: ['#ff5a5a'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#ff5a5a'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 90, 90, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(255, 90, 90, 0.1)'
            }])
          },
          data: [120, 120, 150, 180],
          label: {
            show: true,
            position: 'top',
            formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff5a5a',
            },
          },
        },
        {
          name: '月毛利率',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          yAxisIndex: 1,
          lineStyle: {
            color: '#ff5a5a',
            type: 'dashed'
          },
          data: [100, 110, 100, 90],
          label: {
            show: false,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff'
            },
          },
        }
      ]
    }
  }

  /**
   * 车商活跃趋势图
   */
  initOption7 () {
    const colors = ['#0CF9FF', '#FF5D5D', '#FFC85D', '#0CF9FF', '#ff5a5a', '#ffde81'];
    this.option7 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .8)"
          }
        },
        data: ['10.14-10.20', '10.21-10.27', '10.28-11.04', '11.04-11.11'],
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        }
      ],
      legend: {
        data: [
          { name: '访问车商数(月)', icon: 'rect' }, 
          { name: '参拍车商数(月)', icon: 'rect' }, 
          { name: '中标车商数(月)', icon: 'rect' }, 
          { name: '访问车商数(周)' }, 
          { name: '参拍车商数(周)' }, 
          { name: '中标车商数(周)' }, 
        ],
        width: 400,
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          name: '访问车商数(月)',
          type: 'line',
          // symbol: 'none',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          lineStyle: {
            color: 'transparent',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#28FAFF'
            }, {
              offset: 1,
              color: '#100B2A'
            }])
          },
          data: [520, 660, 780, 820],
          label: {
            show: true,
            position: ['-100%', '-200%'],
            formatter: '{c}',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#28FAFF',
            },
          },
        },
        {
          name: '参拍车商数(月)',
          type: 'line',
          // symbol: 'none',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          lineStyle: {
            color: 'transparent',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FF5D5D'
            }, {
              offset: 1,
              color: '#100B2A'
            }])
          },
          data: [420, 540, 680, 720],
          label: {
            show: false,
            position: ['-100%', '-200%'],
            formatter: '{c}',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#28FAFF',
            },
          },
        },
        {
          name: '中标车商数(月)',
          type: 'line',
          // symbol: 'none',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          lineStyle: {
            color: 'transparent',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#FFC85D'
            }, {
              offset: 1,
              color: '#100B2A'
            }])
          },
          data: [420, 520, 620, 720]
        },
        {
          name: '访问车商数(周)',
          type: 'line',
          smooth: 0.6,
          // symbol: 'none',
          yAxisIndex: 0,
          lineStyle: {
            color: '#0CF9FF'
          },
          data: [10, 15, 10, 10],
          label: {
            show: false,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff'
            },
          },
        },
        {
          name: '参拍车商数(周)',
          type: 'line',
          smooth: 0.6,
          // symbol: 'none',
          yAxisIndex: 0,
          lineStyle: {
            color: '#ff5a5a',
          },
          data: [50, 55, 50, 45],
          label: {
            show: false,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff'
            },
          },
        },
        {
          name: '中标车商数(周)',
          type: 'line',
          smooth: 0.6,
          // symbol: 'none',
          yAxisIndex: 0,
          lineStyle: {
            color: '#ffde81',
          },
          data: [100, 110, 100, 100],
          label: {
            show: false,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#4992ff'
            },
          },
        }
      ]
    }
  }

  /**
   * 月成交率趋势图
   */
  initOption8 () {
    const colors = ['#0CF9FF', '#ff5a5a'];
    this.option8 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '8%'
      }],
      xAxis: [
        {
          type: 'value',
          position: 'left',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: this.fontSize
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .2)'
            },
            show: true
          }
        },
        {
          type: 'value',
          position: 'right',
          axisTick: {
            lineStyle: {
              color: 'transparent',
            }
          },
          axisLabel: {
            show: false,
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      yAxis: {
        type: 'category',
        data: ['8月', '9月', '10月', '11月'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, .8)"
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      legend: {
        data: [
          { name: '毛利', icon: 'rect' }, 
          { name: '毛利率' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 180, 100],
          name: '毛利',
          type: 'bar',
          barWidth: '40%',
          xAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '毛利率',
          type: 'line',
          symbolSize: 6,
          color: ['#ff5a5a'],
          xAxisIndex: 1,
          lineStyle: {
            color: '#ff5a5a'
          },
          data: [20, 120, 150, 100],
          label: {
            show: true,
            position: 'top',
            formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff5a5a',
            },
          },
        }
      ]
    }
  }
}
</script>
<style lang="less">
.public-session {
  height: 100vh;
  width: 100vw;
  background: #100B2A!important;

  &__container {
    display: flex;
    // background: #100B2A;
    width: calc(100vw - 10px);
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
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
}
</style>
