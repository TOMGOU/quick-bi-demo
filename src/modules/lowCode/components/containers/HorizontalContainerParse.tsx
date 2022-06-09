import { Component, Vue } from 'vue-property-decorator';
import HorizontalContainer from './HorizontalContainer.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'

const options = {
  code: 'HorizontalContainer',
  type: 'container',
  label: '横向容器',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '横向容器',
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '容器宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '100vw',
      },
      {
        type: 'el-input-text',
        label: '容器高度',
        name: 'height',
        required: false,
        placeholder: '',
        value: 'calc((100vh - 100px))',
      },
      {
        type: 'vue-color',
        label: '容器背景',
        name: 'background',
        required: false,
        value: '#100B3F',
      },
    ]
  }
}
@Component({
  components: {
    HorizontalContainer,
  }
})
class HorizontalContainerParse extends Vue {
  // static option = option
  static options: any = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const _props = {
      props: {
        jsonSchema: section.section,
        cssStyle: options.cssStyle,
      }
    }
    const _propsOn = {
      on: {
        dragover: section.handleDrop,
        drop: section.handleDrop
      },
      nativeOn: {
        click: (e) => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'HorizontalContainerParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      // @ts-ignore
      <HorizontalContainer
        { ..._props }
        { ..._propsOn }
      >{ children }</HorizontalContainer>
    )
  }
}

// @ts-ignore
HorizontalContainerParse.key = 'HorizontalContainerParse'
// @ts-ignore
HorizontalContainerParse.des = '横向容器'
// @ts-ignore
HorizontalContainerParse.icon = 'lx-icon-solocit-list'

export default HorizontalContainerParse
