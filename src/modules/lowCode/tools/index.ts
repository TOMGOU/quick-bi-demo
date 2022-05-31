 // 标题设置
 export const setOptionsTitle = optionsConfig => {
  const title: any = {};
  title.text = optionsConfig.titleText;
  title.show = optionsConfig.isNoTitle;
  title.left = optionsConfig.textAlign;
  title.textStyle = {
    color: optionsConfig.textColor,
    fontSize: optionsConfig.textFontSize,
    fontWeight: optionsConfig.textFontWeight
  };
  title.subtext = optionsConfig.subText;
  title.subtextStyle = {
    color: optionsConfig.subTextColor,
    fontWeight: optionsConfig.subTextFontWeight,
    fontSize: optionsConfig.subTextFontSize
  };

  return title;
}

// X轴设置
export const setOptionsX = optionsConfig => {
  const xAxis = {
    type: "category",
    show: optionsConfig.hideX, // 坐标轴是否显示
    name: optionsConfig.xName, // 坐标轴名称
    nameTextStyle: {
      color: optionsConfig.nameColorX,
      fontSize: optionsConfig.nameFontSizeX
    },
    nameRotate: optionsConfig.textAngle, // 文字角度
    inverse: optionsConfig.reversalX, // 轴反转
    axisLabel: {
      show: true,
      interval: optionsConfig.textInterval, // 文字间隔
      rotate: optionsConfig.textAngle, // 文字角度
      textStyle: {
        color: optionsConfig.Xcolor, // x轴 坐标文字颜色
        fontSize: optionsConfig.fontSizeX
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: optionsConfig.lineColorX
      }
    },
    splitLine: {
      show: optionsConfig.isShowSplitLineX,
      lineStyle: {
        color: optionsConfig.splitLineColorX
      }
    }
  };
  return xAxis;
}

// Y轴设置
export const setOptionsY = optionsConfig => {
  const yAxis = [
    {
      type: "value",
      splitNumber: optionsConfig.splitNumberLeft,// 均分
      show: optionsConfig.isShowYLeft, // 坐标轴是否显示
      name: optionsConfig.textNameYLeft, // 坐标轴名称
      nameTextStyle: { // 别名
        color: optionsConfig.nameColorYLeft,
        fontSize: optionsConfig.namefontSizeYLeft
      },
      inverse: optionsConfig.reversalY, // 轴反转
      axisLabel: {
        show: true,
        textStyle: {
          color: optionsConfig.colorY, // y轴 坐标文字颜色
          fontSize: optionsConfig.fontSizeY
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: optionsConfig.lineColorY
        }
      },
      splitLine: {
        show: false,
      }
    },
    {
      type: "value",
      splitNumber: optionsConfig.splitNumberRight,// 均分
      show: optionsConfig.isShowYRight, // 坐标轴是否显示
      name: optionsConfig.textNameYRight, // 坐标轴名称
      nameTextStyle: { // 别名
        color: optionsConfig.nameColorYRight,
        fontSize: optionsConfig.namefontSizeYRight
      },
      inverse: optionsConfig.reversalY, // 轴反转
      axisLabel: {
        show: true,
        textStyle: {
          color: optionsConfig.colorY, // y轴 坐标文字颜色
          fontSize: optionsConfig.fontSizeY
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: optionsConfig.lineColorY
        }
      },
      splitLine: {
        show: false,
      }
    }
  ];
  return yAxis;
}

// 折线设置 数值设置
export const setOptionsTop = (optionsConfig, series) => {
  for (const key in series) {
    if (series[key].type == "line") {
      series[key].showSymbol = optionsConfig.markPoint;
      series[key].symbolSize = optionsConfig.pointSize;
      series[key].smooth = optionsConfig.smoothCurve;
      if (optionsConfig.area) {
        series[key].areaStyle = {
          opacity: optionsConfig.areaThickness / 100
        };
      } else {
        series[key].areaStyle = {
          opacity: 0
        };
      }
      series[key].lineStyle = {
        width: optionsConfig.lineWidth
      };
      // series[key].itemStyle.borderRadius = optionsConfig.radius;
      series[key].label = {
        show: optionsConfig.isShowLine,
        position: "top",
        distance: optionsConfig.distanceLine,
        fontSize: optionsConfig.fontSizeLine,
        color: optionsConfig.subTextColorLine,
        fontWeight: optionsConfig.fontWeightLine
      };
    }
  }
  return series;
}

// 柱体设置 数值设置
export const setOptionsBar = (optionsConfig, series) => {
  for (const key in series) {
    if (series[key].type == "bar") {
      series[key].label = {
        show: optionsConfig.isShowBar,
        position: "top",
        distance: optionsConfig.distanceBar,
        fontSize: optionsConfig.fontSizeBar,
        color: optionsConfig.subTextColorBar,
        fontWeight: optionsConfig.fontWeightBar
      };
      series[key].barWidth = optionsConfig.maxWidth;
      series[key].barMinHeight = optionsConfig.minHeight;
      // series[key].itemStyle.barBorderRadius = optionsConfig.radius;
    }
  }
  return series;
}

// tooltip 设置
export const setOptionsTooltip = optionsConfig => {
  const tooltip = {
    trigger: "item",
    show: true,
    textStyle: {
      color: optionsConfig.lineColor,
      fontSize: optionsConfig.tipFontSize
    }
  };
  return tooltip;
}

// 边距设置
export const setOptionsMargin = optionsConfig => {
  const grid = {
    left: optionsConfig.marginLeft,
    right: optionsConfig.marginRight,
    bottom: optionsConfig.marginBottom,
    top: optionsConfig.marginTop,
    containLabel: true
  };
  return grid;
}

// 图例操作 legend
export const setOptionsLegend = (optionsConfig, legend) => {
  legend.show = optionsConfig.isShowLegend;
  legend.left = optionsConfig.lateralPosition;
  legend.top = optionsConfig.longitudinalPosition == "top" ? 0 : "auto";
  legend.bottom = optionsConfig.longitudinalPosition == "bottom" ? 0 : "auto";
  legend.orient = optionsConfig.layoutFront;
  legend.textStyle = {
    color: optionsConfig.lengedColor,
    fontSize: optionsConfig.lengedFontSize
  };
  legend.itemWidth = optionsConfig.lengedWidth;
  return legend
}

// 静态数据
export const staticDataFn = (optionsData, option) => {
  console.log({ optionsData })
  const axis = []
  const data = {}
  optionsData.staticData.forEach((item, index) => {
    axis[index] = item.name
    Object.keys(item).forEach(key => {
      if (!data[key]) {
        data[key] = []
      }
      data[key][index] = item[key]
    })
  })
  option.xAxis.data = axis;
  option.series.forEach(item => {
    item.data = data[item.alias]
  })
}