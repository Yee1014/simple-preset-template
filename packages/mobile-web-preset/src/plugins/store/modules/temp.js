import { SessionStorage } from 'storage-manager-js'

const tempKey = 'temp_calc_freight_detail'

export default {
  namespaced: true,
  state: {
    // 计算运费详情
    calcFreightDetail: SessionStorage.get(tempKey) || null,
  },
  mutations: {
    // 设置运费计算查询条件
    setCalcFreightDetail(state, data) {
      state.calcFreightDetail = data
      SessionStorage.set(tempKey, data)
    },
  },
}
