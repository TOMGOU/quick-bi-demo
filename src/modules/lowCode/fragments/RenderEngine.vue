<script>
import { components, parsers } from '../components'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, namespace } from 'vuex-class'
import { v4 as uuidv4 } from 'uuid'

const biCharts = namespace('biCharts')


@Component({
  components: {
    // ...components,
    ...parsers
  },
})
export default class RenderEngine extends Vue {
  @biCharts.Action('setSelectedType') setSelectedType
  @biCharts.Action('setUuid') setUuid
  @biCharts.State('selectedType') selectedType
  @Prop({default: () => ({})}) jsonSchema

  // 渲染根节点
  renderRoot (h) {
    // TODO: 后期丰富全局配置逻辑入口
    return (
      <div class="root">
        { this.renderComponents(h, this.jsonSchema) }
      </div>
    )
  }

  // 渲染组件
  renderComponents (h, section) {
    // 组件通用逻辑在此处理
    // 是否有子节点
    let _children = null

    if (section.children) {
      // 层级渲染
      _children = this.renderChildren(h, section)
    }
    return this.startRender(h, section, _children)
  }

  // 遍历包含兄弟&子节点
  renderChildren (h, section) {
    let _nodeArray = section.children || [].concat(section)
    // 后期可以在此拓展兄弟节点之间通信
    return _nodeArray.map((n, i) => this.renderComponents(h, n, i))
  }

  // 开始渲染
  startRender (h, section, _children) {
    const _type = section.type
    const renderMod = parsers[_type]

    // 直接渲染
    if (renderMod) {
      return renderMod.extendOptions.render(h,
        {
          section,
          handleDrop: this.handleDrop,
          handleDragOver: this.handleDragOver
        }, _children)
      
    }
    return null
  }

  // 以下为配置系统统一化处理逻辑
  // 拖拽组件经过触发
  handleDragOver () {
    // TODO: 拖拽组件经过容器组件时触发高亮效果
  }
  // 拖拽组件松手
  handleDrop (event, vm) {
    const _json = vm.jsonSchema

    if (_json && (_json.type.includes('Container') || _json.type.includes('Map') || _json.type.includes('Box'))) {
      if (!_json.children) {
        this.$set(_json, 'children', [])
      }
      console.log('parsers:', parsers, parsers[this.selectedType].options)
      const uuid = uuidv4()
      _json.children.push({
        type: this.selectedType,
        option: parsers[this.selectedType].options,
        uuid,
      })

      this.setUuid({ uuid })
    }
  }
  render (h) {
    let _vode = this.renderRoot(h)
    return _vode
  }
}
</script>
<style lang="less">
.root {
  max-height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
    color: transparent;
  }
}
</style>
