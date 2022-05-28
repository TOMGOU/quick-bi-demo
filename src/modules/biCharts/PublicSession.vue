<template>
  <section class="public-session">
    <top-title @handleFullScreen="handleFullScreen"></top-title>
    <div class="public-session__container">
      <div class="public-session__box">
        <bar-line :option="option1"></bar-line>
        <bar-line :option="option4" title="周成交趋势图"></bar-line>
        <bar-line :option="option6" title="周毛利、毛利率趋势图"></bar-line>
      </div>
      <!-- <chart class="public-session__map" :option="option2" :theme="theme" autoresize></chart> -->
      <!-- <bar-line :option="option2"></bar-line> -->
      <div class="public-session__box">
        <!-- <chart class="public-session__map" :option="option2" :theme="theme" autoresize></chart> -->
        <div class="public-session__map-box">
          <top-data :mapData="mapData"></top-data>
          <Map :option="option2"></Map>
          <map-tips :sessionName="sessionName" :sessionAuctions="sessionAuctions" :sessionAuctionRate="sessionAuctionRate"></map-tips>
          <map-table :tableData="tableData" :sessionName="sessionName" @handleChangeSession="handleChangeSession"></map-table>
        </div>
        <bar-line :option="option7" title="车商活跃趋势图"></bar-line>
      </div>
      <div class="public-session__box">
        <bar-line :option="option3" title="关闭订单及争议订单">
          <div class="pie-title">
            <div class="pie-title__close">关闭订单数 <span class="pie-title__hightlight">30单</span> | 同比增长 <span class="pie-title__hightlight">3.0%</span></div>
            <div class="pie-title__dispute">争议订单数 <span class="pie-title__hightlight">30单</span> | 同比增长 <span class="pie-title__hightlight">5.0%</span></div>
          </div>
        </bar-line>
        <bar-line :option="option5" title="月成交率趋势图"></bar-line>
        <bar-line :option="option8" title="月毛利、毛利率趋势图"></bar-line>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'
import BarLine from './components/BarLine.vue'
import TopTitle from './components/TopTitle.vue'
import TopData from './components/TopData.vue'
import MapTable from './components/MapTable.vue'
import MapTips from './components/MapTips.vue'
import Map from './components/Map.vue'
const china = require('./map/copy.json')

const myItemStyle = {
  normal: {
    areaColor: 'rgba(255, 227, 144)',
    color: "rgba(255, 227, 144)",
    borderColor: "rgba(255, 227, 144)",
    borderWidth: 0,
    borderType: "solid",
    // opacity: .3,
    label: { show: false }
  },
  emphasis: {
    areaColor: 'rgba(255, 227, 144)',
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
  private fontSize = 12
  private timer = null
  private currentIndex = 0
  private sessionName = '河南专场'
  private sessionAuctions = 5000
  private sessionAuctionRate = '70.0%'
  private mapHLData = [{ name: '河南省', value: 40689, itemStyle: myItemStyle }]
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
      value: 2000
    },
    {
      title: '今日店均上拍量',
      value: 35
    },
    {
      title: '本月上拍台数',
      value: 6000
    },
    {
      title: '本月店均成交台数',
      value: 860
    },
  ]
  private tableData: any = [
    {
      store_name: '经销店1',
      auctions: '500',
      auction_rate: '70%'
    },
    {
      store_name: '经销店2',
      auctions: '500',
      auction_rate: '70%'
    },
    {
      store_name: '经销店3',
      auctions: '500',
      auction_rate: '70%'
    },
    {
      store_name: '经销店4',
      auctions: '500',
      auction_rate: '70%'
    },
    {
      store_name: '经销店5',
      auctions: '500',
      auction_rate: '70%'
    },
  ]

  mounted () {
    this.setFontSize()
    this.initOption1()
    this.initOption2()
    this.initOption3()
    this.initOption4()
    this.initOption5()
    this.initOption6()
    this.initOption7()
    this.initOption8()
    // 绑定全屏监听事件
    window.addEventListener('fullscreenchange', e => {
      this.handleScreenChange()
    })
    window.onresize = () => {
      this.setFontSize()
    }
    this.timer = setInterval(() => {
      this.handleChangeSession(true)
    }, 3000)
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
    // 解除全屏监听事件
    window.removeEventListener('fullscreenchange', e => {
      this.handleScreenChange()
    })
    clearInterval(this.timer)
  }

  /**
   * 页面全屏事件
   */
  handleFullScreen () {
    if (!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
      const video = document.documentElement as any;
      const rfs = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;
      rfs.call(video);
    } else {
      const rfs = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
      rfs.call(document);
    }
  }

  /**
   * 全屏监听函数
   */
  handleScreenChange () {
    const isFullscreen = !(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
    if (isFullscreen) {
      // 退出全屏
      this.toggleNavCrumb(false)
    } else {
      // 全屏显示
      this.toggleNavCrumb(true)
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
  handleChangeSession (bool) {
    const test = [
      {
        name: '河南专场',
        value: 5000,
        rate: '70%',
        province: ['河南省']
      },
      {
        name: '华南专场',
        value: 5000,
        rate: '70%',
        province: ['广东省', '广西壮族自治区', '四川省', '湖南省', '贵州省', '重庆市', '海南省']
      },
      {
        name: '华北专场',
        value: 5000,
        rate: '70%',
        province: ['湖北省', '江西省', '山东省', '河北省', '山西省', '陕西省', '甘肃省', '宁夏回族自治区', '内蒙古自治区']
      },
      {
        name: '华西专场',
        value: 5000,
        rate: '70%',
        province: ['云南省', '新疆维吾尔自治区', '西藏自治区', '青海省']
      },
      {
        name: '华东专场',
        value: 5000,
        rate: '70%',
        province: ['浙江省', '福建省', '安徽省', '江苏省', '上海市']
      }
    ]
    const len = test.length
    this.currentIndex = bool ? (this.currentIndex + 1) % len : (this.currentIndex - 1 + len) % len
    this.sessionName = test[this.currentIndex].name
    this.sessionAuctions = +(Math.random() * 5000).toFixed(0) + 1000
    this.sessionAuctionRate = (Math.random() * 100).toFixed(1) + '%'
    // 中央地图数据更新
    this.option2.series[0].data = test[this.currentIndex].province.map(item => ({name: item, itemStyle: myItemStyle}))
    this.mapData = [
      {
        title: '今日上拍量',
        value: +(Math.random() * 10000).toFixed(0) + 5000
      },
      {
        title: '今日店均上拍量',
        value: +(Math.random() * 100).toFixed(0) + 10
      },
      {
        title: '本月上拍台数',
        value: +(Math.random() * 5000).toFixed(0) + 1000
      },
      {
        title: '本月店均成交台数',
        value: +(Math.random() * 3000).toFixed(0) + 1000
      },
    ]
    this.tableData = [
      {
        store_name: '经销店1',
        auctions: (Math.random() * 900).toFixed(0),
        auction_rate: (Math.random() * 100).toFixed(0) + '%'
      },
      {
        store_name: '经销店2',
        auctions: (Math.random() * 900).toFixed(0),
        auction_rate: (Math.random() * 100).toFixed(0) + '%'
      },
      {
        store_name: '经销店3',
        auctions: (Math.random() * 900).toFixed(0),
        auction_rate: (Math.random() * 100).toFixed(0) + '%'
      },
      {
        store_name: '经销店4',
        auctions: (Math.random() * 900).toFixed(0),
        auction_rate: (Math.random() * 100).toFixed(0) + '%'
      },
      {
        store_name: '经销店5',
        auctions: (Math.random() * 900).toFixed(0),
        auction_rate: (Math.random() * 100).toFixed(0) + '%'
      },
    ]

    // 日拍趋势图数据更新
    this.option1.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option1.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option1.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 关闭订单及争议订单图数据更新
    this.option3.series[0].data[0].value = (Math.random() * 100).toFixed(0)
    this.option3.series[1].data = [
      {value: (Math.random() * 50).toFixed(0), name: '处理中'},
      {value: (Math.random() * 50).toFixed(0), name: '支持经销店'},
      {value: (Math.random() * 50).toFixed(0), name: '支持车商'},
    ]

    // 周成交趋势图数据更新
    this.option4.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option4.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option4.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option4.series[3].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 月成交率趋势图数据更新
    this.option5.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option5.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option5.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option5.series[3].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 周毛利、毛利率趋势图数据更新
    this.option6.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option6.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option6.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 车商活跃趋势图数据更新
    this.option7.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option7.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option7.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option7.series[3].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    this.option7.series[4].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 月成交率趋势图数据更新
    this.option8.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option8.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
  }

  /**
   * 日拍趋势图
   */
  initOption1 () {
    const colors = ['#0cf9ff', '#0cf9ff', '#fff'];
    this.option1 = {
      color: colors,
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '12%'
      }],
      xAxis: {
        type: 'category',
        data: ['11.19', '11.20', '11.21', '11.22', '11.23', '11.24', '11.25'],
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
          axisLabel: {  
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: ['上拍台次', '拍出台次', '台次拍出率'],
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
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#ffc148'
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
          show: false
        },
        selectedMode: false,
        roam: false,
        itemStyle: {
          normal: {
            borderWidth: 4, //设置外层边框
            borderColor: '#0cf9ff',
            areaColor: '#ffe390',
          },
          emphasis: {
            borderWidth: 4,
            borderColor: '#0cf9ff',
            areaColor: '#ffe390',
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
              areaColor: '#0c1022',
              label: { show: false }
            },
            emphasis: {
              areaColor: '#0c1022',
              label: { show: false }
            },
          },
          data: this.mapHLData
          // data: [
          //     // {name: '广东省', value: 20057, itemStyle: myItemStyle},
          //     // {name: '广西省', value: 15477, itemStyle: myItemStyle},
          //     // {name: '湖南省', value: 31686, itemStyle: myItemStyle},
          //     // {name: '湖北省', value: 6992, itemStyle: myItemStyle},
          //     // {name: '四川省', value: 44045, itemStyle: myItemStyle},
          //     {name: '河南省', value: 40689, itemStyle: myItemStyle},
          //     // {name: '江西省', value: 37659, itemStyle: myItemStyle},
          //     // {name: '福建省', value: 45180, itemStyle: myItemStyle},
          //     // {name: '青海省', value: 55204, itemStyle: myItemStyle},
          //     // {name: '西藏自治区', value: 21900, itemStyle: myItemStyle},
          //     // {name: '新疆维吾尔自治区', value: 4918, itemStyle: myItemStyle},
          //     // {name: '内蒙古自治区', value: 5881, itemStyle: myItemStyle},
          //     // {name: '广西壮族自治区', value: 5881, itemStyle: myItemStyle},
          //     // {name: '宁夏回族自治区', value: 5881, itemStyle: myItemStyle},
          //     // {name: '云南省', value: 4178, itemStyle: myItemStyle},
          //     // {name: '安徽省', value: 2227, itemStyle: myItemStyle},
          //     // {name: '浙江省', value: 2180, itemStyle: myItemStyle},
          //     // {name: '山东省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '黑龙江省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '江苏省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '贵州省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '吉林省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '辽宁省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '河北省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '甘肃省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '山西省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '海南省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '台湾省', value: 9172, itemStyle: myItemStyle},
          //     // {name: '天津市', value: 9172, itemStyle: myItemStyle},
          //     // {name: '北京市', value: 9172, itemStyle: myItemStyle},
          //     // {name: '上海市', value: 9172, itemStyle: myItemStyle},
          // ],
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
      top: '43%',
      left: '65%',
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      width: 10,
      textStyle: {
        fontSize: 8
      },
    },
    series: [
      {
        type: 'gauge',
        center: ['25%', '60%'],
        radius: '65%',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'auto',
          distance: 40,
          fontSize: 4
        },
        title: {
          show : true,
          offsetCenter: [0, '75%'],
          textStyle: {
            fontSize: 14,
            color: '#ff5a5a'
          }
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          textStyle:{
            fontSize: 14,
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
        center: ['72%', '60%'],
        radius: ['45%', '65%'],
        data: [
          {value: 10, name: '处理中'},
          {value: 5, name: '支持经销店'},
          {value: 10, name: '支持车商'},
        ],
        itemStyle: {
          color: '#ff5a5a',
          normal: {
            label: {
              textStyle: {
                color: '#fff'
              }
            }
          },
        },
        label: {
          normal: {
            formatter: '{d}% ',
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
    const colors = ['#0cf9ff', '#0cf9ff', '#fff'];
    this.option4 = {
      color: colors,
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '12%'
      }],
      xAxis: {
        type: 'category',
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
          axisLabel: {  
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: ['上拍台数', '拍出台数', '成交台数', '成交率'],
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
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
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
  initOption5 () {
    const colors = ['#0cf9ff', '#0cf9ff', '#fff'];
    this.option5 = {
      color: colors,
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '12%'
      }],
      xAxis: {
        type: 'category',
        data: ['8月', '9月', '10月', '11月'],
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
          axisLabel: {  
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: ['上拍台数', '拍出台数', '撮合台数', '成交率'],
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
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#4992ff'
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
    const colors = ['#0cf9ff', '#0cf9ff', '#fff'];
    this.option6 = {
      color: colors,
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '12%'
      }],
      xAxis: {
        type: 'category',
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
          axisLabel: {  
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: ['毛利', '毛利率', '月毛利率'],
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
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#ff5a5a'
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
              fontSize: 14,
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
    const colors = ['rgba(255, 193, 72, 0.1)', 'rgba(255, 90, 90, 0.1)', 'rgba(58, 77, 233, 0.1)'];
    this.option7 = {
      color: colors,
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '12%'
      }],
      xAxis: {
        type: 'category',
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
          axisLabel: {  
            formatter: '{value}%',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: ['访问车商数(月)', '参拍车商数(月)', '中标车商数(月)', '访问车商数(周)','参拍车商数(周)', '中标车商数(周)'],
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
          symbol: 'none',
          stack: 'month',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          areaStyle: {
            color: 'rgba(255, 193, 72, 0.5)'
          },
          data: [520, 660, 780, 820]
        },
        {
          name: '参拍车商数(月)',
          type: 'line',
          symbol: 'none',
          stack: 'month',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          areaStyle: {
            color: 'rgba(255, 90, 90, 0.5)'
          },
          data: [420, 540, 680, 720]
        },
        {
          name: '中标车商数(月)',
          type: 'line',
          symbol: 'none',
          stack: 'month',
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          areaStyle: {
            color: 'rgba(58, 77, 233, 0.5)'
          },
          data: [420, 520, 620, 720]
        },
        {
          name: '访问车商数(周)',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          yAxisIndex: 1,
          lineStyle: {
            color: '#ffde81'
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
          data: [10, 15, 10, 10],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#4992ff'
            },
          },
        },
        {
          name: '参拍车商数(周)',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          yAxisIndex: 1,
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
              fontSize: 14,
              color: '#4992ff'
            },
          },
        },
        {
          name: '中标车商数(周)',
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          yAxisIndex: 1,
          lineStyle: {
            color: '#0cf9ff',
          },
          data: [100, 110, 100, 100],
          label: {
            show: false,
            position: 'top',
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
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
    const colors = ['#0cf9ff', '#0cf9ff', '#fff'];
    this.option8 = {
      color: colors,
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
          axisLabel: {  
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
        axisLabel: {
          textStyle: {
            fontSize: this.fontSize
          }
        },
      },
      legend: {
        data: ['上拍台数', '成交率'],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [120, 200, 180, 100],
          name: '上拍台数',
          type: 'bar',
          barWidth: '40%',
          xAxisIndex: 0,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '成交率',
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
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: 14,
              color: '#ff5a5a'
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
  background: #0c1022!important;

  &__container {
    display: flex;
    // background: #0c1022;
    width: calc(100vw - 10px);
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__box {
    display: flex;
    background: #0c1022;
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
    top: 80px;
    left: 50%;
    transform: translateX(-49%);
    width: 75%;
    height: 30px;
    display: flex;
    justify-content: space-around;

    &__close, &__dispute {
      width: 2.2rem;
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
    }

    &__close {
      margin-right: 10px;
    }

    &__dispute {
    }

    &__hightlight {
      color: #0cf9ff;
      font-size: .14rem;
    }
  }
}
</style>
