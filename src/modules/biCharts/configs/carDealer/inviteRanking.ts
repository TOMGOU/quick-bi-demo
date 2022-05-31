export interface RankingTable {
  active_dealer: number;
  type: string;
  valid_dealer: number;
  winning_dealer: number;
}

export interface RankingTableData {
  id: number;
  name: string;
  table: RankingTable[];
  value: number;
}

/**
 * 邀约车商图表的配置项
 * @param data 接口返回的图表数据
 * @param fontSize 页面自适应字体大小
 */
export const inviteRankingOptions = (data: RankingTableData[], fontSize: number) => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
    triggerOn: 'mousemove|click',
    hideDelay: 300
  },
  color: ['#FF8637', '#0CF9FF', '#38FF88', '#FFC238', '#7E48FF', '#FF5756', '#FFFF48', '#4992FF', '#00D93C', '#FF23C0'],
  series: [
    {
      type: 'pie',
      roseType: 'area',
      label: {
        fontSize,
        show: true,
        color: '#fff',
        formatter: ({ data }) => data.name.length > 6 ? `${data.name.substr(0, 6)}...` : data.name
      },
      labelLine: {
        length: 2,
        length2: 2
      },
      center: ['52%', '50%'],
      data: data
    }
  ]
})

// 邀约车商图表的自定义样式
export const inviteRankingMaskCss = {
  display: 'grid',
  'grid-template-rows': '100%',
  'grid-template-columns': '52% 48%',
}

