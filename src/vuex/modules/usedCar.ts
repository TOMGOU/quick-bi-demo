import * as mutationTypes from '../mutationTypes'
import ajax from '@/ajax/index';

const rest = ajax.$rest;
const state = {
  clueDetail: {},
  traces:[],
  // 车辆实时状态
  carStatusInfo: {
    id: 0,
    status: 0,
    status_name: '',
    auction_order_id: '',
    match_order_id: '',
  },
  // 订单确认收款 实收金额
  actualPaidAmount: 0,
  // 当前拍卖详情
  currentAuctionInfo: {},
}

const actions = {
  async getClueDetail({ commit }, params) {
    const { code, data } = await rest.usedCar.getTicketDetail(params);
    if (code === 0) {
      commit(mutationTypes.UPDATE_CLUE_DETAIL, data);
    }
  },
  // 车辆状态信息
  async getCarStatusInfo({ commit }, params) {
    const { id, api } = params
    const { code, data } = await rest.usedCar[api](id)
    if (code === 0) {
      commit(mutationTypes.UPDATE_CAR_STATUS_INFO, data)
    }
  }
}

const mutations = {
  [mutationTypes.UPDATE_CLUE_DETAIL](state, payload) {
    state.clueDetail = payload;
    state.traces = payload.traces;
  },

  [mutationTypes.UPDATE_CAR_STATUS_INFO](state, payload) {
    state.carStatusInfo = payload;
  },

  [mutationTypes.UPDATE_ACTUAL_PAID_AMOUNT](state, payload) {
    state.actualPaidAmount = payload;
  },
  [mutationTypes.UPDATE_CURRENT_AUCTION_INFO](state, payload) {
    state.currentAuctionInfo = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
