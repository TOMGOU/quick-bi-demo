import BACKGROUND_IMG from '../../../../assets/images/city_bg.png'

// 平台车商监控-城市数据展示的背景图
const backgroundImage =  `url(${BACKGROUND_IMG})`

// 固定五个城市展示位置的配置项
export const cityDataBasic = [
  {
    style: {
      backgroundImage,
      left: '28%',
      top: '46%'
    }
  },
  {
    style: {
      backgroundImage,
      left: '66%',
      top: '49%'
    }
  },
  {
    style: {
      backgroundImage,
      left: '44%',
      top: '58%'
    }
  },
  {
    style: {
      backgroundImage,
      left: '21%',
      top: '67%'
    }
  },
  {
    style: {
      backgroundImage,
      left: '59%',
      top: '71%'
    }
  },
]

// 兼容特殊的省份(直辖市)展示位置的配置项
export const specialProvincesBasic = {
  style: {
    backgroundImage,
    left: '43%',
    top: '50%'
  }
}
