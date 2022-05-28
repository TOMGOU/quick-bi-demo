import * as mutationTypes from '../mutationTypes'

const state = {
  // 图表渲染配置文件
  jsonSchema: {
    type: 'VerticalContainerParse',
    children: [
      {
        type: 'BarLineParse'
      },
    ]
  },
  // 当前选中图表唯一标识
  uuid: '',
  // 当前选中图表
  selectedType: 'VerticalContainerParse'
}

const actions = {
  setJsonSchema({ commit }, data) {
    commit(mutationTypes.UPDATE_JSON_SCHEMA, data);
  },
  setUuid({ commit }, data) {
    commit(mutationTypes.UPDATE_UUID, data);
  },
  setSelectedType({ commit }, data) {
    commit(mutationTypes.UPDATE_SELECTED_TYPE, data);
  },
}

const mutations = {
  [mutationTypes.UPDATE_JSON_SCHEMA](state, payload) {
    state.jsonSchema = payload.jsonSchema;
  },
  [mutationTypes.UPDATE_UUID](state, payload) {
    state.uuid = payload.uuid;
  },
  [mutationTypes.UPDATE_SELECTED_TYPE](state, payload) {
    state.selectedType = payload.selectedType;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}