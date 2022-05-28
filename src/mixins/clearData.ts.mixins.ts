import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class ClearDataMixin extends Vue {
  sessionData = '';

  dataAlias = {};

  created() {
    if (!window.sessionStorage.getItem('sessionData')) {
      window.sessionStorage.setItem('sessionData', JSON.stringify([]));
    }
  }

  deactivated() {
    // 离开重置data对象
    // this.dataAlias = Object.assign(this.dataAlias, JSON.parse(window.sessionStorage.getItem(this.sessionData)))
    this.dataAlias = _.merge(this.dataAlias, JSON.parse((window.sessionStorage.getItem(this.sessionData) || '').toString()));
    window.sessionStorage.removeItem(this.sessionData);
  }

  activated() {
    // 获取最新sessionData对象
    let dataArr = JSON.parse((window.sessionStorage.getItem('sessionData') || '').toString());
    // 清除刷新产生的多余sessionData对象
    Object.keys(dataArr).forEach((k) => {
      window.sessionStorage.removeItem(dataArr[k]);
    });
    dataArr = []; // 清空
    // 进入组件时重置sessionData对象
    this.sessionData = `sessionData${new Date().getTime()}`;
    // 记录每次刷新产生的sessionData
    dataArr.push(this.sessionData);
    window.sessionStorage.setItem('sessionData', JSON.stringify(dataArr));
    // 首次进入缓存Data初始对象
    window.sessionStorage.setItem(this.sessionData, JSON.stringify(this.dataAlias));
  }

  // 同一组件，tab切换时，公用同一data对象，因此可以把离开进入时的操作合并
  clearSessionData() {
    // 离开 === 进入 重置data对象
    this.dataAlias = Object.assign(this.dataAlias, JSON.parse((window.sessionStorage.getItem(this.sessionData) || '').toString()));
    window.sessionStorage.removeItem(this.sessionData);
    // 获取最新sessionData对象
    let dataArr = JSON.parse((window.sessionStorage.getItem('sessionData') || '').toString());
    // 清除刷新产生的多余sessionData对象
    Object.keys(dataArr).forEach((k) => {
      window.sessionStorage.removeItem(dataArr[k]);
    });
    dataArr = []; // 清空
    // 进入组件时重置sessionData对象
    this.sessionData = `sessionData${new Date().getTime()}`;
    // 记录每次刷新产生的sessionData
    dataArr.push(this.sessionData);
    window.sessionStorage.setItem('sessionData', JSON.stringify(dataArr));
    // 首次进入缓存Data初始对象
    window.sessionStorage.setItem(this.sessionData, JSON.stringify(this.dataAlias));
  }
}
