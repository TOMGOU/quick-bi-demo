<template>
  <div class="info-table">
    <div class="info-table__main-title" v-if="title">{{title}}</div>
    <div class="info-table__body" v-for="subTable in processedInfoList" :key="subTable.subTitle">
      <div class="info-table__sub-title" v-if="subTable.subTitle">{{subTable.subTitle}}</div>
      <div class="info-table__sub-body">
        <div class="info-table__items" v-for="item in subTable.items" :key="item.title">
          <div class="info-table__item-title">{{item.title}}</div>
          <div v-if="item.slotName">
            <slot :name="item.slotName"></slot>
          </div>
          <div class="info-table__item-wrap" v-else>
            <Ellipsis :content="`${item.value || (item.title && '--')}`"></Ellipsis>
            <span class="info-table__item-btn" v-if="item.btnText" @click="handleBtnClick(item.btnInfo)">{{item.btnText}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Ellipsis } from '@lx-frontend/wrap-element-ui'

interface InfoList {
  subTitle: string
  items: InfoItem[]
}

interface InfoItem {
  title: string
  value: string
  slotName?: string
  btnText?: string
  btnInfo?: string
}

@Component({
  components: {
    Ellipsis
  }
})
export default class InfoTable extends Vue {
  @Prop({default: ''}) title: string
  @Prop({default: () => ([])}) infoList: InfoList[]

  isFloatSpanShow = false

  get processedInfoList() {
    return this.infoList.map(subTable => {
      const isEven = subTable.items.length % 2 === 0
      return {
        ...subTable,
        items: isEven ? subTable.items : [...subTable.items, {title: '', value: ''}]
      }
    })
  }

  handleBtnClick(key) {
    this.$emit('btn-click', key)
  }
}
</script>

<style lang="less">
.info-table {
  border-bottom: solid 1px #d8dce6;
  width: 100%;
  min-width: 600px;
  margin-top: 27px;

  &__main-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f6f7fb;
    border: solid 1px #d8dce6;
    border-bottom: none;
    font-size: 12px;
    color: #333333;
    font-weight: bold;
    padding-left: 15px;
  }

  &__sub-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    border: solid 1px #d8dce6;
    border-bottom: none;
  }

  &__sub-body {
    display: flex;
    flex-wrap: wrap;
  }

  &__items {
    display: flex;
    align-items: center;
    width: 50%;
    height: 40px;
    padding: 12px 0;
    box-sizing: border-box;
    border: solid 1px #d8dce6;
    border-bottom: none;
    font-size: 12px;

    &:nth-child(2n) {
      border-left: none;
    }
  }

  &__item-title {
    width: 204px;
    color: #989ea9;
    padding-left: 15px;
    box-sizing: border-box;
  }

  &__item-wrap {
    display: flex;
    align-items: center;
    white-space: nowrap;

    /deep/ .ellipsis-popover {
      max-width: 370px;
    }

    /deep/ .ellipsis__last-line {
      max-width: 230px;
    }
  }

  &__item-value {
    display: inline-block;
    color: #333333;
    line-height: 1.1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &__item-btn {
    display: inline-block;
    font-size: 12px;
    color: #1890ff;
    cursor: pointer;
    margin-left: 13px;
  }
}
</style>
