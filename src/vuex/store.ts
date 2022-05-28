/**
 * vuex 状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '@/ajax/index';
import * as mutationTypes from './mutationTypes'

// 经销店组管理
import storeGroup from './modules/storeGroup'
// 二手车管理
import usedCar from './modules/usedCar'
// 图表数据
import biCharts from './modules/biCharts'

const rest = ajax.$rest;

Vue.use(Vuex);
const initState = {
  direction: 'forward',
  hideNav: false, // 默认展示导航条需要
  hideCrumb: false, // 默认展示面包屑需要
  router: '/', // 当前路由,
  redirect: '', // 重定向路由
  authList: [], // 权限列表
  authPrefix: '/auth/weixin/',

  userId: '', // 用户id
  userName: '', // 用户名
  cdnCommon: process.env.CDN_COMMON, // 通用js库文件的cdn前缀
  stores: [], //所有经销店
  cities: [], //所有城市
  group: {  // 集团信息
    name: '',
    short_name: '',
    logo_url: '',
  }, 
};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initState,
  modules: {
    storeGroup,
    usedCar,
    biCharts
  },
  mutations: {
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction;
    },
    UPDATE_NAV (state, hideNav) {
      state.hideNav = hideNav;
    },
    UPDATE_CRUMB (state, hideCrumb) {
      state.hideCrumb = hideCrumb;
    },
    UPDATE_ROUTER (state, router) {
      state.router = router;
    },
    UPDATE_REDIRECT (state, redirect) {
      state.redirect = redirect;
    },
    // 更新权限列表
    UPDATE_USERINFO (state, userInfo) {
      state.authList = userInfo.permissions;
      state.userName = userInfo.name;
      state.userId = userInfo.id;
    },
    [mutationTypes.UPDATE_STORES](state, payload) {
      state.stores = payload.stores;
    },
    [mutationTypes.UPDATE_CITIES](state, payload) {
      state.cities = payload.cities;
    },
    [mutationTypes.UPDATE_CURRENT_GROUP](state, payload) {
      state.group = payload;
    },
  },
  actions: {
    UPDATE_USERINFO({ commit }, { message }) {
      // return rest.login.getAuth().then(res => {
      //   if (res.code === 0) {
      //     commit('UPDATE_USERINFO', res.data);
      //     return Promise.resolve(res.data);
      //   }
      //   return true;
      // });
      commit('UPDATE_USERINFO', {});
    },
    async getStores({ commit }, params) {
      const { code, data } = await rest.global.getStores(params);
      if (code === 0) {
        commit(mutationTypes.UPDATE_STORES, data);
      }
    },
    async getCities({ commit }, params) {
      const { code, data } = await rest.global.getCities(params);
      if (code === 0) {
        commit(mutationTypes.UPDATE_CITIES, data);
      }
    },
    async getCurrentGroup({ commit }, params) {
      const { code, data } = await rest.login.getGroupInfo(params);
      if (code === 0) {
        commit(mutationTypes.UPDATE_CURRENT_GROUP, data);
      }
    }
  },
  getters: {
    direction (state) {
      return state.direction;
    },
    hideNav (state) {
      return state.hideNav;
    },
    hideCrumb (state) {
      return state.hideCrumb;
    },
    router (state) {
      return state.router;
    },
    userId (state) {
      return state.userId;
    }
  },
});
ajax.extend({ $store: store });
export default store;
