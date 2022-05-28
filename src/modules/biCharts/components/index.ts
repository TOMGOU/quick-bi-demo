const vueReq = require.context('./', false, /(.+)\.vue/)
const parseReq = require.context('./', false, /(.+)Parse\.ts/)

const componentsName = vueReq.keys()
const components = componentsName.reduce((components, module) => {
  const mod = vueReq(module)
  components[mod.default.name] = mod.default
  return components
}, {})

const parsersName = parseReq.keys()
const parsersList = parsersName.map(item => {
  const mod = parseReq(item)
  return {
    name: mod.default.name,
    des: mod.default.des
  }
  // item.match(/.\/(.+)\.tsx/g)
  // return RegExp.$1
})
const parsers = parsersName.reduce((parsers, module) => {
  const mod = parseReq(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

export { components, parsers, parsersList }
