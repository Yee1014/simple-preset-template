/**
 * baseData
 * @author  Yee
 * @date    2021/5/27
 * @desc    基础数据
 */
import { tI18n } from '@/plugins/i18n'
import { createOrderDefaultConfig } from '@/data/DataModel'
import BaseDataApi from '@/api/modules/BaseDataApi'
import baseDataApi from '@/api/modules/BaseDataApi'
import { orderSendTypeMap } from '@/data/DataVariables'

export default {
  namespaced: true,
  state: {
    // 预报单设置
    siteSetting: {
      // 是否支持申请出运
      applyTransportEnabled: false,
      // 是否支持fba申请出运
      fbaApplyTransportEnabled: false,
      // 是否支持待审核展示
      pendingReviewEnabled: false,
      // 是否支持fba
      fbaEnabled: false,
      // 是否支持上门揽件
      toDoorEnabled: false,
      // 预报单创建是否显示外包装数量
      isPackageCountSupported: false,
      /**
       * 账单确认方式
       * 0、设置为无，则客户端的待付款列表中无费用确认按钮、支付按钮；
       * 货代后台的待付款及之后的订单状态无【费用确认状态】字段
       *
       * 1、设置为费用确认，则客户端的待付款列表中有费用确认按钮；
       * 客户确认费用后，订单状态不变化；
       * 货代后台的待付款及之后的状态均展示【费用确认状态】字段
       *
       * 2、设置为费用确认且订单流转到待出运，则客户端的待付款列表中有费用确认按钮；
       * 客户确认费用后，订单状态变更到待出运；
       * 货代后台的待付款及之后的状态均展示【费用确认状态】字段
       *
       * 3、设置为允许客户支付，则客户端待付款列表中有支付按钮；
       * 客户付款后，订单状态变更到待出运
       * 货代后台的待付款及之后的订单状态无【费用确认状态】字段
       */
      billConfirmationMethod: 0,
      // fba账单确认方式
      fbaBillConfirmationMethod: 0,
    },
    // 目的地
    destinationList: [],
    // 可用目的地 运价方案列表
    quotePlanList: [],
    // 货物类型
    goodsTypesList: [],
    // 收货仓库
    receiveWarehouse: [],
    // 预报模式
    forecastModules: [],
    // 税号类型数据
    taxTypeList: [],
    // 币种数据
    currencyList: [],
    // 预报单， 编辑， 详情， 相关列表 展示
    forecastShowConfig: [],
    // 创建预报单 展示配置
    forecastModeConfig: [],
    /**
     * 订单字段配置
     * 自有单号/货物类型/包裹照片/报关方式/包裹类型/运费支付方式/税金支付方式 - 可选 [无0 选填1 必填2]
     * 运价方案/申报信息/寄件信息/收件信息/通知人信息 - 可选 [选填0 必填1]
     */
    orderFieldConfig: createOrderDefaultConfig(),
    orderFieldList: [],
    // 基础站点配置， 包括导航栏，功能入口，揽件方式
    baseSiteConfig: null,
    // 申报信息字段配置
    reportFieldConfig: null,
    // 收件信息类型/地址类型 控制
    orderSupportAddressList: [],
    //自定义枚举
    customEnumOptions: null,
  },
  mutations: {
    //设置 自定义枚举
    setCustomEnumOptions(state, data) {
      if (!state.customEnumOptions) state.customEnumOptions = {}
      state.customEnumOptions[data.type] = data.enumOptions
    },
    /**
     * 设置支持的地址类型
     * @param state
     * @param data
     */
    setOrderSupportAddressList(state, data) {
      state.orderSupportAddressList = data
    },
    /**
     * 设置创建预报单 展示配置
     * @param state
     * @param data
     */
    setForecastModeConfig(state, data) {
      state.forecastModeConfig = data
    },
    /**
     * 订单字段配置
     * @param state
     * @param data
     */
    setOrderFieldList(state, data) {
      state.orderFieldList = data
    },
    /**
     * 订单字段配置
     * @param state
     * @param data
     */
    setOrderFieldConfig(state, data) {
      state.orderFieldConfig = data
    },
    /**
     * 设置基础站点配置
     * 包括集运模块展示，个人中心模块展示
     * @param state
     * @param data
     */
    setBaseSiteConfig(state, data) {
      state.baseSiteConfig = data
    },
    /**
     * 设置申报信息字段配置
     * @param state
     * @param data
     */
    setReportFieldConfig(state, data) {
      state.reportFieldConfig = data
    },
    /**
     * 设置预报单展示
     * @param state
     * @param data
     */
    setForecastShowConfig(state, data) {
      state.forecastShowConfig = data
    },
    /**
     * 设置币种
     * @param state
     * @param data
     */
    setCurrencyList(state, data) {
      state.currencyList = data
    },
    /**
     * 设置目的地
     * @param state
     * @param data
     */
    setDestinationList(state, data) {
      data.forEach(item => {
        item.label = `${item.name}(${item.code})`
      })
      state.destinationList = data
    },
    /**
     * 设置可用目的地
     * @param state
     * @param data
     */
    setUsefulDestinationList(state, data) {
      state.quotePlanList = Array.isArray(data) ? data : []
    },
    /**
     * 设置货物类型
     * @param state
     * @param data
     */
    setGoodsTypesList(state, data) {
      state.goodsTypesList = data
    },
    /**
     * 设置支持fba
     * @param state
     * @param data
     */
    setFbaEnabled(state, data) {
      state.siteSetting.fbaEnabled = data
    },
    /**
     * 设置支持上门揽件
     * @param state
     * @param data
     */
    setToDoorEnabled(state, data) {
      state.siteSetting.toDoorEnabled = data
    },
    /**
     * 设置预报单创建是否显示外包装数量
     * @param state
     * @param data
     */
    setIsPackageCountSupported(state, data) {
      state.siteSetting.isPackageCountSupported = data
    },
    /**
     * 设置申请出运
     * @param state
     * @param data
     */
    setApplyTransportEnabled(state, data) {
      state.siteSetting.applyTransportEnabled = data
    },
    /**
     * 设置fba申请出运
     * @param state
     * @param data
     */
    setFbaApplyTransportEnabled(state, data) {
      state.siteSetting.fbaApplyTransportEnabled = data
    },
    /**
     * 设置待审核展示
     * @param state
     * @param data
     */
    setPendingReviewEnabled(state, data) {
      state.siteSetting.pendingReviewEnabled = data
    },
    /**
     * 设置账单确认方式
     * @param state
     * @param data
     */
    setBillConfirmationMethod(state, data) {
      state.siteSetting.billConfirmationMethod = data
    },
    /**
     * 设置账单确认方式
     * @param state
     * @param data
     */
    setFbaBillConfirmationMethod(state, data) {
      state.siteSetting.fbaBillConfirmationMethod = data
    },
    /**
     * 设置收货仓库
     * @param state
     * @param data
     */
    setReceiveWarehouse(state, data) {
      state.receiveWarehouse = data
    },
    // 设置预报模式
    setForecastModules(state, data) {
      state.forecastModules = data || []
    },
    /**
     * 设置税号数据
     * @param state
     * @param data
     */
    setTaxTypeList(state, data) {
      state.taxTypeList = data
    },
  },
  actions: {
    getCustomEnumOptions({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        baseDataApi
          .getCustomEnumList(data)
          .then(({ data }) => {
            const records = data?.records
            commit('setCustomEnumOptions', {
              type: data.type,
              enumOptions: records,
            })
            resolve(records)
          })
          .catch(e => reject(e))
      })
    },
    // 根据路由名称获取标题名称
    async getCbcModuleTitle({ getters, rootGetters }, { routeName, code }) {
      // 没有店铺信息直接返回空
      if (!rootGetters['app/siteInfo']) {
        return ''
      }
      // 仅这些路由模块会重命名
      const routeNameList = [
        'CalcFreight',
        'WareHouseList',
        'SheetForecast',
        'OrderCreate',
        'OrderQuery',
        'Freight',
        'CBCHome',
        'MyHome',
      ]
      if (!routeNameList.includes(routeName)) {
        return ''
      }
      let list = [
        ...getters.cbcModuleConfig,
        ...(getters.baseSiteConfig?.baseInfoList || []),
      ]
      if (!(list && list.length)) {
        // await AppApi.fetchSiteDetail()
        const res = await BaseDataApi.fetchModeAndEntryConfig()
        if (res.code === 200) {
          const data = res.data
          const entryList =
            data.functionEntrance.pageDTOList
              .find(i => i.source === 1)
              ?.valueDTOList.find(v => v.key === 'homepageButton')
              ?.configList || []
          const tabList =
            data.functionEntrance.pageDTOList.find(i => i.source === 1)
              ?.baseInfoList || []
          list = [...entryList, ...tabList]
        }
      }
      const routeNameMap = {
        CalcFreight: 'quoteCount',
        WareHouseList: 'receivingWarehouse',
        OrderCreate: 'orderCreate',
        OrderQuery: 'queryOrder',
        CBCHome: 'prcd',
        MyHome: 'center',
      }
      const field = routeNameMap[routeName]
      if (field) {
        const item = list.find(item => item.key === field)
        return item?.rename || item?.value
      } else if (code) {
        const item = list.find(item => item.key === code)
        return item?.rename
      }
    },
  },
  getters: {
    baseSiteConfig: state => state.baseSiteConfig,
    destinationList: state => state.destinationList.filter(i => i.enable),
    getGroupDestList: (state, getters) => type => {
      return (
        getters.destinationList.filter(i => i.type === parseInt(type)) || []
      )
    },
    quotePlanList: state => state.quotePlanList || [],
    // 目的地 fba
    fbaWarehousesList: (state, getters) => getters.getGroupDestList(1),
    // 目的地 自提点
    selfWarehouseList: (state, getters) => getters.getGroupDestList(2),
    goodsTypesList: state => state.goodsTypesList.filter(i => i.isEnabled),
    receiveWarehouse: state => state.receiveWarehouse,
    siteSetting: state => state.siteSetting,
    // 旧 收件信息类型
    fbaTypeRadioList: state => {
      return [
        { label: tI18n('label.addressDetail'), value: -1, enabled: true },
        {
          label: tI18n('label.FBA'),
          value: 1,
          enabled: state.siteSetting.fbaEnabled,
          boolean: false,
        },
        {
          label: tI18n('label.ZTD'),
          value: 2,
          enabled: true,
          boolean: true,
        },
      ]
    },
    orderSupportAddressList: state =>
      state.orderSupportAddressList.filter(i => i.status === 1),
    // 收件地址支持类型
    receiveAddressType: (state, getters) => {
      const map = {
        detailAddressSupport: {
          label: tI18n('label.addressDetail'),
          value: -1,
        },
        fbaWarehouseSupport: {
          label: tI18n('label.FBA'),
          value: 1,
        },
        owenSupport: {
          label: tI18n('label.ZTD'),
          value: 2,
        },
      }
      const list = getters.orderSupportAddressList.filter(i => i.type === 2)
      list.forEach(i => {
        const match = map[i.code]
        if (match) {
          i.label = match.label
          i.value = match.value
        }
      })
      return list
    },
    /**
     * 获取展示配置列表
     * @param state
     * @return {function(*)} 传入入口对应key
     */
    getEntryConfigList: state => key => {
      return (
        state.baseSiteConfig?.valueDTOList
          ?.find(item => item.key === key)
          ?.configList.filter(i => i.isShow)
          ?.sort((a, b) => a.sort - b.sort) || []
      )
    },
    /**
     * 根据key获取对应tab
     * @param state
     * @return {function(*): *}
     */
    getBaseTabConfig: state => key => {
      return (
        state.baseSiteConfig?.baseInfoList?.find(item => item.key === key) || {}
      )
    },
    // 揽件方式
    packageTypeRadioList: (state, getters) => {
      const list = getters.getEntryConfigList('reportModel')
      const map = orderSendTypeMap()
      list.forEach(item => {
        item.label = map[item.modeType]
        item.value = item.modeType
      })
      return list.sort((a, b) => a.sort - b.sort)
    },
    packageTypeMap: (state, getters) => {
      const map = {}
      getters.packageTypeRadioList.forEach(item => {
        map[item.value] = item.key
      })
      return map
    },
    // 税号类型数据
    taxTypeList: state => state.taxTypeList,
    // 币种数据
    currencyList: state => state.currencyList.filter(i => i.isEnabled),
    // 预报单展示
    forecastShowConfig: state => state.forecastShowConfig,
    // 预报单展示匹配
    forecastShowFieldConfig: state => {
      const map = {}
      state.forecastShowConfig.forEach(item => {
        map[item.key] = item.status
      })
      return map
    },
    // 个人中心模块控制配置
    myCenterModuleConfig: (state, getters) => {
      if (!state.baseSiteConfig) return []
      return getters.getEntryConfigList('userCenterButton')
    },
    // 个人中心模块名称
    myCenterModuleName: state => {
      if (!state.baseSiteConfig) return ''
      return (
        state.baseSiteConfig.baseInfoList.find(item => item.key === 'center')
          ?.value || ''
      )
    },
    // 跨境集运模块控制配置
    cbcModuleConfig: (state, getters) => {
      if (!state.baseSiteConfig) return []
      return getters.getEntryConfigList('homepageButton')
    },
    // 跨境集运模块名称
    cbcModuleName: state => {
      if (!state.baseSiteConfig) return ''
      return (
        state.baseSiteConfig.baseInfoList.find(item => item.key === 'prcd')
          ?.value || ''
      )
    },
    // 订单字段配置
    orderFieldList: state => state.orderFieldList,
    orderFieldConfig: (state, getters) => {
      const map = createOrderDefaultConfig()
      getters.orderFieldList.forEach(({ code, status }) => {
        map[code] = status
      })
      return map
    },
    forecastModeConfig: state => state.forecastModeConfig,
    reportFieldConfig: state => state.reportFieldConfig,
  },
}
