import { Component, Vue } from 'vue-property-decorator';
import VerticalContainer from './VerticalContainer.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'

const options = {
  code: 'VerticalContainer',
  type: 'container',
  label: '纵向容器',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '纵向容器',
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '容器宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '33.3vw',
      },
      {
        type: 'el-input-text',
        label: '容器高度',
        name: 'height',
        required: false,
        placeholder: '',
        value: 'calc(100vh - 100px)',
      },
      {
        type: 'vue-color',
        label: '容器背景',
        name: 'background',
        required: false,
        value: '#100B2A',
      },
    ]
  }
}

@Component({
  components: {
    VerticalContainer,
  }
})
class VerticalContainerParse extends Vue {
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
            selectedType: 'VerticalContainerParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      // @ts-ignore
      <VerticalContainer
        { ..._props }
        { ..._propsOn }
      >{ children }</VerticalContainer>
    )
  }
}

// @ts-ignore
VerticalContainerParse.key = 'VerticalContainerParse'
// @ts-ignore
VerticalContainerParse.des = '纵向容器'
// @ts-ignore
VerticalContainerParse.icon = 'lx-icon-deliver-boards'

export default VerticalContainerParse
