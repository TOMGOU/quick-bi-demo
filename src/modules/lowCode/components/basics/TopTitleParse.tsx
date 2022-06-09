import { Component, Vue } from 'vue-property-decorator';
import TopTitle from './TopTitle.vue'
import store from '@/vuex/store'
import { handleOptionsData } from '../../utils'

const options = {
  code: 'TopTitle',
  type: 'container',
  label: '图表标题',
  icon: 'lx-icon-address',
  options: {
    config: [
      {
        type: 'el-input-text',
        label: '组件名称',
        name: 'layerName',
        required: false,
        placeholder: '',
        value: '图表标题',
      },
      {
        type: 'vue-color',
        label: '背景颜色',
        name: 'background',
        required: false,
        placeholder: '',
        value: ''
      },
    ],
    cssStyle: [
      {
        type: 'el-input-text',
        label: '标题',
        name: 'title',
        required: false,
        placeholder: '',
        value: '公开场数据监控',
      },
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
        value: '100px',
      },
    ]
  }
}

@Component({
  components: {
    TopTitle,
  }
})
class TopTitleParse extends Vue {
  static options: any = options

  render (h, section, children) {
    const options = handleOptionsData(section.section.option.options)
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          store.dispatch('biCharts/setSelectedType', {
            selectedType: 'TopTitleParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      },
      on: {
        dragover: section.handleDrop,
        drop: section.handleDrop
      },
      props: {
        jsonSchema: section.section,
        cssStyle: options.cssStyle,
        // @ts-ignore
        title: options.cssStyle.title,
      }
    }
    
    return (
      // @ts-ignore
      <TopTitle
        { ..._propsOn }
      ></TopTitle>
    )
  }
}

// @ts-ignore
TopTitleParse.key = 'TopTitleParse'
// @ts-ignore
TopTitleParse.des = '图表标题'
// @ts-ignore
TopTitleParse.icon = 'lx-icon-rejected2'

export default TopTitleParse
