import * as mutationTypes from '../mutationTypes'
import ajax from '@/ajax/index';

const rest = ajax.$rest;
const state = {
  storeGroups: []
}

const actions = {
  async getStoreGroups({ commit }, params) {
    const { code, data } = await rest.operate.getStoreGroups(params);
    if (code === 0) {
      commit(mutationTypes.UPDATE_STORE_GROUPS, data);
    }
  }
}

const mutations = {
  [mutationTypes.UPDATE_STORE_GROUPS](state, payload) {
    state.storeGroups = payload.store_groups;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}