import { Component, Vue } from 'vue-property-decorator';
import ChartBox from './ChartBox.vue'
import store from '@/vuex/store'
const option = {
  title: '图表标题',
  cssStyle: {
    height: 'calc((100vh - 165px) / 3)'
  }
}

@Component({
  components: {
    ChartBox,
  }
})
class ChartBoxParse extends Vue {
  static option = option

  render (h, section, children) {
    const _props = {
      props: {
        cssStyle: section.section.option.cssStyle,
        title: section.section.option.title,
        jsonSchema: section.section
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
ChartBoxParse.des = '图表框'

export default ChartBoxParse
