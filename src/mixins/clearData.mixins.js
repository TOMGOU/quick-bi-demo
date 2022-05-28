import _ from 'lodash';
import { debug } from 'util';

export default {
  data () {
    return {
      sessionData: '',
    };
  },
  created() {
    if (!window.sessionStorage.getItem('sessionData')) {
      window.sessionStorage.setItem('sessionData', JSON.stringify([]));
    }
  },
  deactivated() {
    // 离开重置data对象
    // this._data = Object.assign(this._data, JSON.parse(window.sessionStorage.getItem(this.sessionData)))
    this._data = _.merge(this._data, JSON.parse(window.sessionStorage.getItem(this.sessionData)));
    window.sessionStorage.removeItem(this.sessionData);
  },
  activated() {
    // 获取最新sessionData对象
    let dataArr = JSON.parse(window.sessionStorage.getItem('sessionData'));
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
    window.sessionStorage.setItem(this.sessionData, JSON.stringify(this._data));
  },
  methods: {
    // 同一组件，tab切换时，公用同一data对象，因此可以把离开进入时的操作合并
    clearSessionData() {
      // 离开 === 进入 重置data对象
      this._data = Object.assign(this._data, JSON.parse(window.sessionStorage.getItem(this.sessionData)));
      window.sessionStorage.removeItem(this.sessionData);
      // 获取最新sessionData对象
      let dataArr = JSON.parse(window.sessionStorage.getItem('sessionData'));
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
      window.sessionStorage.setItem(this.sessionData, JSON.stringify(this._data));
    },
  },
};
