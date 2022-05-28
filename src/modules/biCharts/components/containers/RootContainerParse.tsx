import { Component, Vue } from 'vue-property-decorator';
import RootContainer from './RootContainer.vue'
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
    RootContainer,
  }
})
class RootContainerParse extends Vue {
  static option = option

  render (h, section, children) {
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
            selectedType: 'RootContainerParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      <RootContainer
        { ..._props }
        { ..._propsOn }
      >{ children }</RootContainer>
    )
  }
}

// @ts-ignore
RootContainerParse.des = '根容器'

export default RootContainerParse
