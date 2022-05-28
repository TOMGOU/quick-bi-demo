import { Component, Vue } from 'vue-property-decorator';
import VerticalContainer from './VerticalContainer.vue'
import store from '@/vuex/store'
const option = {
  cssStyle: {
    width: '33.3vw',
    height: 'calc(100vh - 100px)',
    background: '#0c1022'
  }
}

@Component({
  components: {
    VerticalContainer,
  }
})
class VerticalContainerParse extends Vue {
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
            selectedType: 'VerticalContainerParse'
          })
          store.dispatch('biCharts/setUuid', {
            uuid: section.section.uuid,
          })
        }
      }
    }
    return (
      <VerticalContainer
        { ..._props }
        { ..._propsOn }
      >{ children }</VerticalContainer>
    )
  }
}

// @ts-ignore
VerticalContainerParse.des = '纵向容器'

export default VerticalContainerParse
