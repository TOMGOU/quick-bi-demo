import { Component, Vue } from 'vue-property-decorator';
import ChartBox from './ChartBox.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'

const options = {
  code: 'ChartBox',
  type: 'container',
  label: '图表框',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '图表框',
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '图表标题',
        name: 'title',
        required: false,
        placeholder: '',
        value: '日拍趋势图',
      },
      {
        type: 'el-input-text',
        label: '容器宽度',
        name: 'width',
        required: false,
        placeholder: '',
        value: '30vw',
      },
      {
        type: 'el-input-text',
        label: '容器高度',
        name: 'height',
        required: false,
        placeholder: '',
        value: 'calc((100vh - 110px) / 3)',
      },
    ]
  }
}

@Component({
  components: {
    ChartBox,
  }
})
class ChartBoxParse extends Vue {
  static options: any = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const _props = {
      props: {
        jsonSchema: section.section,
        // @ts-ignore
        title: options.cssStyle.title,
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
            selectedType: 'ChartBoxParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      <ChartBox
        { ..._props }
        { ..._propsOn }
      >{ children }</ChartBox>
    )
  }
}

// @ts-ignore
ChartBoxParse.key = 'ChartBoxParse'
// @ts-ignore
ChartBoxParse.des = '图表框'
// @ts-ignore
ChartBoxParse.icon = 'lx-icon-distributed-list'

export default ChartBoxParse
