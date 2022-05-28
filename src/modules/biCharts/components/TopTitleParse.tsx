import { Component, Vue } from 'vue-property-decorator';
import TopTitle from './TopTitle.vue'
import store from '@/vuex/store'

const option = {
  cssStyle: {
    width: '100vw'
  },
  title: '公开场数据监控'
}

@Component({
  components: {
    TopTitle,
  }
})
class TopTitleParse extends Vue {
  static option: any = option

  render (h, section, children) {
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
      props: {
        title: section.section.option.title,
        cssStyle: section.section.option.cssStyle,
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
TopTitleParse.des = '图表标题'

export default TopTitleParse
