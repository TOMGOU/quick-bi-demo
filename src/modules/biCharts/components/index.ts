const vueReq = require.context('./', false, /(.+)\.vue/)
const parseReq = require.context('./', true, /(.+)Parse\.ts/)
const parseChartsReq = require.context('./charts/', false, /(.+)Parse\.ts/)
const parseContainersReq = require.context('./containers/', false, /(.+)Parse\.ts/)
const parseBasicsReq = require.context('./basics/', false, /(.+)Parse\.ts/)

const components = vueReq.keys().reduce((components, module) => {
  const mod = vueReq(module)
  components[mod.default.name] = mod.default
  return components
}, {})

const parsersList = parseReq.keys().map(item => {
  const mod = parseReq(item)
  return {
    name: mod.default.name,
    des: mod.default.des
  }
  // item.match(/.\/(.+)\.tsx/g)
  // return RegExp.$1
})
const parsers = parseReq.keys().reduce((parsers, module) => {
  const mod = parseReq(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

const charts = parseChartsReq.keys().reduce((parsers, module) => {
  const mod = parseChartsReq(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

const containers = parseContainersReq.keys().reduce((parsers, module) => {
  const mod = parseContainersReq(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

const basics = parseBasicsReq.keys().reduce((parsers, module) => {
  const mod = parseBasicsReq(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

export { components, parsers, parsersList, charts, containers, basics }
