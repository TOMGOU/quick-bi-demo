<template>
  <section class="t-plan-session">
    <top-title @handleFullScreen="handleFullScreen" :isShow="false" title="T计划&内部场拍卖数据"></top-title>
    <div class="t-plan-session__container">
      <chart-box
        title="T计划数据"
        :cssStyle="{width: '66vw', height: 'calc(100vh - 125px)'}"
        :titleStyle="{'padding-left': '30px'}"
        :bgImg="bgImgLeft"
      >
        <vertical-container :cssStyle="{width: '30vw', height: 'calc(100vh - 205px)', 'padding-top': '15px'}">
          <bar-line-frameless
            :option="option1"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) /3)'}"
            title="日拍卖趋势图"
          ></bar-line-frameless>
          <bar-line-frameless
            :option="option2"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) /3)'}"
            title="周拍卖趋势图"
          ></bar-line-frameless>
          <bar-line-frameless
            :option="option3"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) /3)'}"
            title="月拍卖趋势图"
          ></bar-line-frameless>
        </vertical-container>
        <vertical-container :cssStyle="{width: '30vw', height: 'calc(100vh - 205px)', 'padding-top': '15px'}">
          <bar-line-frameless
            :option="option4"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 3 / 10)'}"
            title="T计划流拍后公开场拍卖数据(月)"
          ></bar-line-frameless>
          <bar-line-frameless
            ref="top"
            :option="option5"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 3 / 10)'}"
            title="上拍量TOP经销店(月)"
          ></bar-line-frameless>
          <table-frameless
            :cssStyle="{height: 'calc((100vh - 205px) * 2 / 10)'}"
            :tableData="YFTableData"
            title="一丰—参拍TOP经销店(月)"
          ></table-frameless>
          <table-frameless
            :cssStyle="{height: 'calc((100vh - 205px) * 2 / 10)'}"
            :tableData="GFTableData"
            title="广丰—参拍TOP经销店(月)"
          ></table-frameless>
        </vertical-container>
      </chart-box>
      <chart-box
        title="内部场数据"
        :cssStyle="{width: '33vw', height: 'calc(100vh - 125px)'}"
        :maskStyle="{'background-position': '0% 50%'}"
        :titleStyle="{'padding-left': '10px'}"
        :bgImg="bgImgRight"
      >
        <vertical-container :cssStyle="{width: '30vw', height: 'calc(100vh - 205px)', 'padding-top': '15px'}">
          <bar-line-frameless
            :option="option6"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 23 / 100)'}"
            title="日拍卖趋势图"
          ></bar-line-frameless>
          <bar-line-frameless
            :option="option7"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 23 / 100)'}"
            title="周拍卖趋势图"
          ></bar-line-frameless>
          <bar-line-frameless
            :option="option8"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 23 / 100)'}"
            title="月拍卖趋势图"
          ></bar-line-frameless>
          <bar-line-frameless
            :option="option9"
            :loading="loading"
            :cssStyle="{height: 'calc((100vh - 205px) * 30 / 100)'}"
            title="雷克萨斯品牌各车系车龄分布(年)"
          ></bar-line-frameless>
        </vertical-container>
      </chart-box>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import eCharts from 'vue-echarts'
import * as echarts from 'echarts'
import VerticalContainer from './components/VerticalContainer.vue'
import ChartBox from './components/ChartBox.vue'
import BarLine from './components/BarLine.vue'
import BarLineFrameless from './components/BarLineFrameless.vue'
import TableFrameless from './components/TableFrameless.vue'
import TopTitle from './components/TopTitle.vue'

@Component({
  components: {
    chart: eCharts,
    VerticalContainer,
    ChartBox,
    BarLine,
    BarLineFrameless,
    TableFrameless,
    TopTitle,
  },
})
export default class PublicSession extends Vue {
  @Mutation('UPDATE_NAV') updateNav
  @Mutation('UPDATE_CRUMB') hideCrumb
  private bgImgRight = require('../../assets/styles/images/chart-container-small.png')
  private bgImgLeft = require('../../assets/styles/images/chart-container-middle.png')
  private fontSize = 12
  private timer = null
  private loading = true
  private YFTableData = [
    {
      rank: '0',
      store_name: '宝安雷克萨斯',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '1',
      store_name: '壹方城新能源',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '2',
      store_name: '南山一汽丰田',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
  ]
  private GFTableData = [
    {
      rank: '0',
      store_name: '宝安新沙店',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '1',
      store_name: '南山广汽丰田',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
    {
      rank: '2',
      store_name: '壹方城新能源',
      car_count: '200',
      rates: '50',
      sold_car_count: '100',
      gross_profit_rates: '60',
    },
  ]
  private topMatch = new Map([
    ['Search店', [11, 12]],
    ['Direct店', [11, 12]],
    ['Email店', [11, 12]],
    ['Union店', [11, 12]],
    ['Video店', [11, 12]],
    ['其他', [11, 12]]
  ])
  private topData = [
    { rate: 10, car_rate: 10, value: 90, name: 'Search店' },
    { rate: 10, car_rate: 10, value: 60, name: 'Direct店' },
    { rate: 10, car_rate: 10, value: 50, name: 'Email店' },
    { rate: 10, car_rate: 10, value: 40, name: 'Union店' },
    { rate: 10, car_rate: 10, value: 30, name: 'Video店' },
    { rate: 10, car_rate: 10, value: 180, name: '其他' },
  ]
  private option1: any = {}
  private option2: any = {}
  private option3: any = {}
  private option4: any = {}
  private option5: any = {}
  private option6: any = {}
  private option7: any = {}
  private option8: any = {}
  private option9: any = {}
  private theme = require('./theme/index.json')

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
    this.initOption9()
    this.fetchData()
    this.timer = setInterval(this.fetchData, 3000)
  }

  /**
   * 获取 T 计划拍卖数据
   */
  async fetchData () {
    // const { code = -1, data = {}, message = '' } = await this.$rest.biCharts.getTPlanSessionData() || {}
    // if (code !== 0) return
    
    // 日拍趋势图数据更新
    this.option1.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option1.series[1].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option1.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 周拍趋势图数据更新
    // this.option2.xAxis.data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option2.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option2.series[1].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option2.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 月拍趋势图数据更新
    // this.option3.xAxis.data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option3.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option3.series[1].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option3.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // T计划流拍后公开场拍卖数据更新
    // this.option4.xAxis.data = data.l_tmpl_data.tplan_reauctions.tmpls.map(item => item.length > 4 ? item.substr(0, 4) + '...' : item)
    this.option4.series[0].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option4.series[1].data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option4.series[2].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 上拍量TOP经销店数据更新
    this.topData = [
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '新沙店' },
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '广汽店' },
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '本田店' },
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '宝安店' },
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '南山店' },
      { rate: +(Math.random() * 5 + 5).toFixed(0), car_rate: +(Math.random() * 5 + 5).toFixed(0), value: +(Math.random() * 50 + 40).toFixed(0), name: '罗湖店' },
    ]
    const matchArr: any = this.topData.map((item: any) => {
      return [item.name, [item.value, item.rate.toFixed(1)]]
    })
    this.topMatch = new Map(matchArr)
    this.initOption5()

    // 一丰—参拍TOP经销店
    // this.YFTableData = data.l_tmpl_data.yf_top_stores

    // 广丰—参拍TOP经销店
    // this.GFTableData = data.l_tmpl_data.gf_top_stores

    // 内部场日拍卖趋势图
    // this.option6.xAxis.data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option6.series[0].data = [(Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0)]
    this.option6.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]
    
    // 内部场周成交趋势图
    // this.option7.xAxis.data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option7.series[0].data = [(Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0)]
    this.option7.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 内部场月成交趋势图
    // this.option8.xAxis.data = [(Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0), (Math.random() * 300).toFixed(0)]
    this.option8.series[0].data = [(Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0), (Math.random() * 300 + 100).toFixed(0)]
    this.option8.series[1].data = [(Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0), (Math.random() * 100).toFixed(0)]

    // 雷克萨斯品牌各车系车龄分布
    // this.option9.xAxis.data = data.r_tmpl_data.serie_age_auctions.serie_names
    this.option9.series[0].data = [(Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 6).toFixed(0), (Math.random() * 10 + 7).toFixed(0)]
    this.option9.series[1].data = [(Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 7).toFixed(0)]
    this.option9.series[2].data = [(Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 9).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 6).toFixed(0), (Math.random() * 10 + 10).toFixed(0)]
    this.option9.series[3].data = [(Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 6).toFixed(0), (Math.random() * 10 + 8).toFixed(0), (Math.random() * 10 + 5).toFixed(0), (Math.random() * 10 + 10).toFixed(0), (Math.random() * 10 + 6).toFixed(0), (Math.random() * 10 + 7).toFixed(0)]

    this.loading = false
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
   * T计划-日拍趋势图
   */
  initOption1 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148'];
    this.option1 = {
      color: colors,
      tooltip: {
        trigger: 'item',
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['11.22', '11.23', '11.24', '11.25'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "transparent"
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
          data: [120, 200, 150, 130],
          name: '上拍台次',
          type: 'bar',
          barWidth: '25%',
          yAxisIndex: 0,
          showBackground: true,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#49dad8'},
                  {offset: 1, color: '#08b2e5'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [10, 20, 50, 80],
          name: '拍出台次',
          type: 'bar',
          barWidth: '25%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff5980'},
                  {offset: 1, color: '#ffa882'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '台次拍出率',
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
            // formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff5a5a',
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
   * T计划-周成交趋势图
   */
  initOption2 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '4992ff'];
    this.option2 = {
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
            color: "transparent"
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
          data: [120, 200, 150, 110],
          name: '上拍台数',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: true,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#49dad8'},
                  {offset: 1, color: '#08b2e5'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [10, 170, 180, 30],
          name: '成交台数',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff5980'},
                  {offset: 1, color: '#ffa882'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '成交率',
          type: 'line',
          symbolSize: 6,
          color: ['#ffde81'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#ffde81'
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
          data: [120, 170, 110, 130],
          label: {
            show: true,
            position: 'top',
            // formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ffde81',
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
   * T计划-月成交率趋势图
   */
  initOption3 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
    this.option3 = {
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
            color: "transparent"
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
          data: [120, 200, 150, 110],
          name: '上拍台数',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: true,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#49dad8'},
                  {offset: 1, color: '#08b2e5'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [10, 170, 180, 30],
          name: '成交台数',
          type: 'bar',
          barWidth: '20%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value ? params.value : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff5980'},
                  {offset: 1, color: '#ffa882'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '成交率',
          type: 'line',
          symbolSize: 6,
          color: ['#5bc285'],
          yAxisIndex: 1,
          lineStyle: {
            color: '#5bc285'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(91, 194, 133, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(91, 194, 133, 0.1)'
            }])
          },
          data: [20, 120, 150, 200],
          label: {
            show: true,
            position: 'top',
            // formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#5bc285',
            },
          },
        }
      ]
    }
  }

  /**
   * T计划流拍后公开场拍卖数据
   */
  initOption4 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
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
        data: ['西南场', '华南场', '华北场', '华东场', '其他场'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "transparent"
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
          data: [120, 200, 150, 80, 70],
          name: '上拍台次',
          type: 'bar',
          barWidth: '25%',
          yAxisIndex: 0,
          showBackground: true,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#49dad8'},
                  {offset: 1, color: '#08b2e5'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [10, 20, 50, 80, 170],
          name: '拍出台次',
          type: 'bar',
          barWidth: '25%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'insideTop',
            formatter: params => params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#ff5980'},
                  {offset: 1, color: '#ffa882'}
                ]
              )
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          name: '台次拍出率',
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
          data: [120, 120, 150, 110, 130],
          label: {
            show: true,
            position: 'top',
            // formatter: params => params.value === 0 ? `${params.value}%` : `${params.value.toFixed(1)}%`,
            formatter: '{c}%',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff5a5a',
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
   * 上拍量TOP经销店
   */
  initOption5 () {
    const colors = ['#ffde81', '#5bc285', '#565b8d', '#6887fd', '#ff6e76', '#0CF9FF'];
    this.option5 = {
      color: colors,
      tooltip: {
        trigger: 'item',
        formatter: param => `${param.data.name}  ${param.data.value}台  ${param.data.car_rate}%`
      },
      legend: {
        orient: 'vertical',
        top: 'middle',
        left: '55%',
        itemWidth: 10,
        itemHeight: this.fontSize - 2,
        itemGap: this.fontSize - 2,
        width: 10,
        icon: "circle",
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize,
          rich: {
            name: {
              width: 90
            },
            amount: {
              width: 35
            },
            percent: {
              width: 20
            },
          },
        },
        formatter: name => `{name|${name.length > 6 ? name.substr(0, 6) + '...' : name}} {amount|${this.topMatch.get(name)[0]}台}  {percent|${this.topMatch.get(name)[1]}%}`
      },
      series: [
        {
          name: '上拍量TOP经销店',
          type: 'pie',
          radius: '90%',
          center: ['30%', '50%'],
          data: this.topData,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#000016'
          },
          label: {
            show: true,
            color: '#fff',
            normal: {
              formatter: params => `${params.data.value}\n${params.data.car_rate}%`,
              position:'inside',
              fontSize: this.fontSize - 2
            },
            itemStyle: {
              color: '#ff5a5a'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  /**
   * 内部场-日拍趋势图
   */
  initOption6 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
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
        data: ['11.19', '11.20', '11.21', '11.22', '11.23', '11.24', '11.25'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "transparent"
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
            show: true,
            formatter: '{value}',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台次' }, 
          { name: '拍出台次' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '0%',
        left: '50%'
      },
      series: [
        {
          name: '上拍台次',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          color: ['#ff5a5a'],
          yAxisIndex: 0,
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
          data: [120, 120, 80, 110, 130, 90, 80],
          label: {
            show: true,
            position: [-10, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff5a5a',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
        {
          name: '拍出台次',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          color: ['#0cf9ff'],
          yAxisIndex: 0,
          lineStyle: {
            color: '#0cf9ff'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(12, 249, 255, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(12, 249, 255, 0.1)'
            }])
          },
          data: [20, 30, 50, 10, 30, 40, 50],
          label: {
            show: true,
            position: [20, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#0cf9ff',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
      ]
    }
  }

  /**
   * 内部场-周拍趋势图
   */
  initOption7 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
    this.option7 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '2%'
      }],
      xAxis: {
        type: 'category',
        data: ['10.14-10.20', '10.21-10.27', '10.28-11.04', '11.04-11.11', '11.11-11.18'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "transparent"
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
            show: true,
            formatter: '{value}',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台数' }, 
          { name: '拍出台数' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '0%',
        left: '50%'
      },
      series: [
        {
          name: '上拍台数',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          color: ['#ffde81'],
          yAxisIndex: 0,
          lineStyle: {
            color: '#ffde81'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(255, 222, 129, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(255, 222, 129, 0.1)'
            }])
          },
          data: [120, 80, 110, 90, 80],
          label: {
            show: true,
            position: [-10, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ffde81',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
        {
          name: '拍出台数',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          color: ['#5bc285'],
          yAxisIndex: 0,
          lineStyle: {
            color: '#5bc285'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(91, 194, 133, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(91, 194, 133, 0.1)'
            }])
          },
          data: [20, 30, 10, 30, 40],
          label: {
            show: true,
            position: [20, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#5bc285',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
      ]
    }
  }

  /**
   * 内部场-月拍趋势图
   */
  initOption8 () {
    const colors = ['#0CF9FF', '#ff5a5a', '#ffc148', '#4992ff'];
    this.option8 = {
      color: colors,
      tooltip: {
        trigger: 'item'
      },
      grid: [{
        left: '10%',
        bottom: '15%',
        top: '30%',
        right: '0%'
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
            color: "transparent"
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
            show: true,
            formatter: '{value}',
            textStyle: {
              fontSize: this.fontSize
            }
          },
        }
      ],
      legend: {
        data: [
          { name: '上拍台数', icon: 'circle' }, 
          { name: '拍出台数', icon: 'circle' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '0%',
        left: '50%'
      },
      series: [
        {
          name: '上拍台数',
          type: 'line',
          smooth: false,
          symbolSize: 6,
          color: ['#565b8d'],
          yAxisIndex: 0,
          lineStyle: {
            color: '#565b8d'
          },
          areaStyle: {
            color: '#565b8d'
          },
          data: [50, 50, 90, 90],
          label: {
            show: true,
            position: [-10, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#565b8d',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
        {
          name: '拍出台数',
          type: 'line',
          smooth: false,
          symbolSize: 6,
          color: ['#ff6e76'],
          yAxisIndex: 0,
          lineStyle: {
            color: '#ff6e76'
          },
          areaStyle: {
            color: '#ff6e76'
          },
          data: [20, 30, 50, 50],
          label: {
            show: true,
            position: [20, -10],
            formatter: params => params.value === 0 ? '' : params.value,
            textStyle: {
              align: 'center',
              fontSize: this.fontSize,
              color: '#ff6e76',
              textShadowColor: '#000',
              textShadowBlur: 4,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1
            },
          },
        },
      ]
    }
  }

  /**
   * 雷克萨斯品牌各车系车龄分布
   */
  initOption9 () {
    const colors = ['#ff6e76', '#ffde81', '#26c5c9', '#565b8d'];
    this.option9 = {
      color: colors,
      tooltip: {
        trigger: 'item',
        formatter: arg => `${arg.seriesName}(${arg.name}): ${arg.value}%`
      },
      grid: [{
        left: '10%',
        bottom: '25%',
        top: '20%',
        right: '4%'
      }],
      xAxis: {
        type: 'category',
        data: ['雷克萨斯', 'ES系', 'NX系', 'RX系', 'CT系', 'IS系', 'UX系', 'LX系', 'LS系'],
        axisTick: {
          lineStyle: {
            color: 'transparent',
          }
        },
        axisLine: {
          lineStyle: {
            color: "transparent"
          }
        },
        axisLabel: {
          interval: 0,
          rotate: '45',
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
            show: false
          }
        }
      ],
      legend: {
        data: [
          { name: '3年内', icon: 'rect' }, 
          { name: '3-6年', icon: 'rect' }, 
          { name: '6-10年', icon: 'rect' }, 
          { name: '10年以上', icon: 'rect' }, 
        ],
        textStyle: {
          color: '#fff',
          fontSize: this.fontSize
        },
        top: '5%'
      },
      series: [
        {
          data: [20, 20, 30, 30, 20, 40, 20, 20],
          name: '3年内',
          type: 'bar',
          stack: 'series',
          barWidth: '50%',
          yAxisIndex: 0,
          showBackground: true,
          label: {
            show: true,
            position: 'inside',
            formatter: params => params.value ? `${params.value}%` : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize - 2,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: '#ff6e76'
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [30, 20, 30, 20, 30, 10, 20, 30, 30],
          name: '3-6年',
          type: 'bar',
          stack: 'series',
          barWidth: '50%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'inside',
            formatter: params => params.value ? `${params.value}%` : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize - 2,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: '#ffde81'
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [30, 20, 10, 30, 30, 10, 20, 30, 20],
          name: '6-10年',
          type: 'bar',
          stack: 'series',
          barWidth: '50%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'inside',
            formatter: params => params.value ? `${params.value}%` : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize - 2,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: '#26c5c9'
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
        {
          data: [30, 20, 20, 30, 30, 30, 20, 30, 30],
          name: '10年以上',
          type: 'bar',
          stack: 'series',
          barWidth: '50%',
          yAxisIndex: 0,
          showBackground: false,
          label: {
            show: true,
            position: 'inside',
            formatter: params => params.value ? `${params.value}%` : '',
            textStyle: {
              align: 'center',
              fontSize: this.fontSize - 2,
              color: '#08142d',
            },
          },
          itemStyle: {
            normal: {
              color: '#565b8d'
            }
          },
          backgroundStyle: {
            color: 'rgba(12, 249, 255, 0)'
          },
        },
      ]
    }
  }
}
</script>
<style lang="less">
.t-plan-session {
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
    margin-top: -10px;
  }

  .el-table::before {
    height: 0;
  }
}
</style>
