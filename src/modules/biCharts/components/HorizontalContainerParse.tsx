import { Component, Vue } from 'vue-property-decorator';
import HorizontalContainer from './HorizontalContainer.vue'
import store from '@/vuex/store'
const option = {
  cssStyle: {
    width: '100vw',
    height: 'calc(100vh - 100px)',
    background: '#0c1022'
  }
}
@Component({
  components: {
    HorizontalContainer,
  }
})
class HorizontalContainerParse extends Vue {
  static option = option

  render (h, section, children) {
    const _this = this
    const _props = {
      props: {
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
            selectedType: 'HorizontalContainerParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      <HorizontalContainer
        { ..._props }
        { ..._propsOn }
      >{ children }</HorizontalContainer>
    )
  }
}

// @ts-ignore
HorizontalContainerParse.des = '横向容器'

export default HorizontalContainerParse
