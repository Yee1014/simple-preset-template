/**
 * DataValidator
 * @author  Yee
 * @date    2021/11/5
 * @desc    数据校验
 */
import RuleUtil from '@/utils/RuleUtil'
import { tI18n } from '@/plugins/i18n'

// 收件信息校验规则
const commonInfoRule = type => {
  const map = {
    // 寄件人
    senderInfo: tI18n('formRule.requiredSendInfo'),
    // 收件人
    receiverInfo: tI18n('formRule.requiredReceiveInfo'),
    // 通知人
    notifierInfo: tI18n('formRule.requiredNotifierInfo'),
  }
  return [
    {
      validator: (rule, value, callback) => {
        const {
          name,
          phone,
          country,
          city,
          postCode,
          detailAddressList,
          receiverType,
          destinationId,
        } = value
        // 特殊处理收件信息
        if (type === 'receiverInfo') {
          // -1 详细地址 1 海外仓fba 2 自提点
          if (receiverType === -1) {
            // 详细地址
            if (
              !name ||
              !phone ||
              !country ||
              !city ||
              !postCode ||
              !detailAddressList[0]
            ) {
              callback(`${map[type]}`)
            } else {
              callback()
            }
          } else if ([1, 2].includes(receiverType)) {
            // fba
            // 自提点
            if (!destinationId) {
              callback(`${map[type]}`)
            } else {
              callback()
            }
          }
        } else {
          if (
            !name ||
            !phone ||
            !country ||
            !city ||
            !postCode ||
            !detailAddressList[0]
          ) {
            callback(`${map[type]}`)
          } else {
            callback()
          }
        }
      },
    },
  ]
}

// 运价方案校验规则
const quoteInfoRule = [
  {
    validator: (rule, value, callback) => {
      const { planId } = value
      if (!planId) {
        callback(tI18n('formRule.requiredPlanName'))
      } else {
        callback()
      }
    },
    required: true,
  },
]

// 申报信息校验规则
const declareInfoRule = [
  {
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || value.length === 0) {
        callback(tI18n('formRule.requiredReportInfo'))
        return
      }
      const valid = value.some(item => {
        const { productNameCn, productNameEn, price, count } = item
        return !productNameCn || !productNameEn || !price || !count
      })
      if (valid) {
        callback(tI18n('formRule.requiredReportInfo'))
      } else {
        callback()
      }
    },
  },
]

// 包裹照片校验规则
const packageImageRule = [
  {
    validator: (rule, value, callback) => {
      if (!value.length) {
        callback(tI18n('formRule.requiredPackageImage'))
      } else {
        callback()
      }
    },
    required: true,
  },
]

// 增值服务校验规则
const valueAddsRule = [
  {
    validator: (rule, value, callback) => {
      if (!value.length) {
        callback(tI18n('formRule.valueAddedServiceImage'))
      } else {
        callback()
      }
    },
    required: true,
  },
]

/**
 * 创建预报单校验规则
 * @param fields
 */
export const createForecastDataRules = fields => {
  // 字段匹配
  const ruleMap = {
    // 货物类型
    cargoType: 'goodsTypeBizKey',
    // 入库仓库
    intoWarehouseInfo: 'receivingWarehouseId',
    // 运价方案
    planName: 'quoteInfo',
    // 申报信息
    reportInfo: 'declareInfoList',
    // 寄件人
    senderInfo: 'senderInfo',
    // 收件人
    receiverInfo: 'receiverInfo',
    // 通知人
    notifierInfo: 'notifierInfo',
  }

  // 校验提示信息
  const ruleMessage = {
    intoWarehouseInfo: [
      RuleUtil.isRequiredValid(
        tI18n('formRule.requiredPackageInfo.receiveWareHouse')
      ),
    ],
    cargoType: [RuleUtil.isRequiredValid(tI18n('formRule.requiredGoodsType'))],
    // 币种
    currencyType: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCurrencyType')),
    ],
  }

  const rules = {}

  fields.forEach(({ key, status }) => {
    // 2 是必填
    if (status !== 2) {
      return
    }
    if (['receiverInfo', 'senderInfo', 'notifierInfo'].includes(key)) {
      rules[ruleMap[key]] = commonInfoRule(key)
    } else if (key === 'planName') {
      rules[ruleMap[key]] = quoteInfoRule
    } else if (key === 'reportInfo') {
      rules[ruleMap[key]] = declareInfoRule
    } else {
      rules[ruleMap[key]] = ruleMessage[key]
    }
    if (key === 'reportInfo' && status !== 0) {
      rules['currencyType'] = ruleMessage.currencyType
    }
  })
  return rules
}

/**
 * 创建订单校验
 * @param fields
 * @return {{}}
 */
export const createOrderDataRules = fields => {
  // 字段匹配
  const ruleMap = {
    // 自有单号
    selfOrder: 'selfOrder',

    // 货物类型
    cargoType: 'goodsTypeBizKey',
    // 包裹照片
    packageImage: 'packImages',
    // 报关方式
    declareCustomsType: 'declareCustomsTypeId',
    //清关方式
    customsClearanceMethod: 'declareCustomsTypeId',
    // 运费支付方式
    freightPaymentMethod: 'freightPaymentMethodId',
    // 税金支付方式
    taxPaymentMethod: 'taxPaymentMethodId',
    //交货条款
    deliveryClause: 'deliveryClauseId',

    // 包裹类型
    packageType: 'packageType',
    // 增值服务
    valueAddedService: 'addValueIds',
    // -----------以下字段为1时必填-------------
    // 运价方案
    planName: 'quoteInfo',
    // 申报信息
    reportInfo: 'declareInfoList',
    // 寄件人
    senderInfo: 'senderInfo',
    // 收件人
    receiverInfo: 'receiverInfo',
    // 通知人
    notifierInfo: 'notifierInfo',
    // 所属仓库
    belongWarehouse: 'warehouseId',
  }

  // 1 必填
  const value1RequiredKeys = [
    'planName',
    'reportInfo',
    'senderInfo',
    'receiverInfo',
    'notifierInfo',
    'belongWarehouse',
  ]

  const validMessage = {
    // 业务单号
    selfOrder: [RuleUtil.isRequiredValid(tI18n('formRule.requiredSelfOrder'))],
    // 运费支付方式
    freightPaymentMethod: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCustomEnumLabel3')),
    ],
    // 税金支付方式
    taxPaymentMethod: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCustomEnumLabel4')),
    ],
    // 清关方式
    customsClearanceMethod: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCustomEnumLabel1')),
    ],
    // 交货条款
    deliveryClause: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCustomEnumLabel2')),
    ],
    // 货物类型
    cargoType: [RuleUtil.isRequiredValid(tI18n('formRule.requiredGoodsType'))],
    // 报关方式
    declareCustomsType: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCustomEnumLabel0')),
    ],
    // 包裹类型
    packageType: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredPackageType')),
    ],
    // 币种
    currencyType: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredCurrencyType')),
    ],
    // 所属仓库
    belongWarehouse: [
      RuleUtil.isRequiredValid(tI18n('formRule.requiredBelongWarehouseType')),
    ],
  }

  const rules = {
    currencyType: validMessage.currencyType,
  }

  fields.forEach(({ code, status }) => {
    if (!ruleMap[code]) return
    // 1必填
    if (value1RequiredKeys.includes(code)) {
      if (status !== 1) return
      if (['receiverInfo', 'senderInfo', 'notifierInfo'].includes(code)) {
        rules[ruleMap[code]] = commonInfoRule(code)
      } else if (code === 'planName') {
        rules[ruleMap[code]] = quoteInfoRule
      } else if (code === 'reportInfo') {
        rules[ruleMap[code]] = declareInfoRule
      } else {
        rules[ruleMap[code]] = validMessage[code]
      }
    } else {
      if (status !== 2) return
      if (code === 'packageImage') {
        rules[ruleMap[code]] = packageImageRule
      } else if (code === 'valueAddedService') {
        rules[ruleMap[code]] = valueAddsRule
      } else {
        rules[ruleMap[code]] = validMessage[code]
      }
    }
  })
  return rules
}
