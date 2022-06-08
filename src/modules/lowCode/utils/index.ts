export const handleOptionsData = (option) => {
  const params = {
    config: {},
    data: {},
    cssStyle: {}
  }

  // config
  option.config && option.config.forEach(item => {
    if (Object.prototype.toString.call(item) == "[object Object]") {
      params.config[item.name] = item.value
    } else if (Object.prototype.toString.call(item) == "[object Array]") {
      item.forEach(config => {
        config.list.forEach(list => {
          params.config[list.name] = list.value
        })
      })
    }
  })

  // data
  option.data && option.data.forEach(data => {
    params.data[data.name] = data.value
  })

  // cssStyle
  option.cssStyle && option.cssStyle.forEach(style => {
    params.cssStyle[style.name] = style.value
  })
  return params;
}
