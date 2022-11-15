/**
 * DataVariables
 * @author  Yee
 * @date    2022/3/16
 * @desc    数据map、enum
 */

import { tI18n } from '@/plugins/i18n'

// 目的地类型
export const DestinationTypeMap = () => ({
  0: tI18n('label.COUNTRY'),
  1: tI18n('label.FBA'),
  2: tI18n('label.ZTD'),
  3: tI18n('label.ProvinceCity'),
  4: tI18n('label.OTHER'),
})

// 包裹类型
export const packageTypesMap = () => ({
  0: tI18n('packageTypes.bundle'),
  1: tI18n('packageTypes.file'),
  2: tI18n('packageTypes.pak'),
})

// 报关方式
export const declareCustomsTypeMap = () => ({
  0: tI18n('declareCustoms.noNeed'),
  1: tI18n('declareCustoms.normal'),
  2: tI18n('declareCustoms.pay'),
  3: tI18n('declareCustoms.tax'),
  4: '9610',
  5: '9710',
  6: '9810',
  7: '1210',
})

// 运费/税金支付方式
export const paymentMethodMap = () => ({
  0: tI18n('paymentMethod.PP'),
  1: tI18n('paymentMethod.CC'),
  2: tI18n('paymentMethod.TP'),
  3: tI18n('paymentMethod.DNT'),
  4: tI18n('paymentMethod.CVAT'),
})

// 订单单子状态
export const orderStatusMap = () => ({
  '-1': tI18n('text.returnedParts'),
  0: tI18n('text.pendingReview'),
  5: tI18n('text.pendingPay'),
  1: tI18n('text.notTransported'),
  3: tI18n('text.hasTransported'),
  6: tI18n('text.hasReceived'),
  2: tI18n('text.boxed'),
  4: tI18n('text.cancelledOrder'),
})

// 订单单子状态
export const fbaOrderStatusMap = () => ({
  '-1': tI18n('text.returnedParts'),
  20: tI18n('text.notStored'),
  0: tI18n('text.hasStored'),
  5: tI18n('text.pendingPay'),
  1: tI18n('text.notTransported'),
  3: tI18n('text.hasTransported'),
  6: tI18n('text.hasReceived'),
})

// 预报单单子状态
export const forecastStatusMap = () => ({
  0: tI18n('text.notStored'),
  1: tI18n('text.hasStored'),
  2: tI18n('text.builtOrder'),
  '-1': tI18n('text.cancel'),
})

// 收件信息类型
export const receiverTypeMap = () => ({
  '-1': tI18n('label.addressDetail'),
  1: tI18n('label.FBA'),
  2: tI18n('label.ZTD'),
})

// 运费支付方式
export const paymentMethodList = () => [
  { label: tI18n('paymentMethod.PP'), value: 0 },
  { label: tI18n('paymentMethod.CC'), value: 1 },
  { label: tI18n('paymentMethod.TP'), value: 2 },
]

// 税金支付方式
export const taxPaymentMethodList = () => [
  { label: tI18n('paymentMethod.PP'), value: 0 },
  { label: tI18n('paymentMethod.CC'), value: 1 },
  { label: tI18n('paymentMethod.TP'), value: 2 },
  {
    label: tI18n('paymentMethod.DNT'),
    value: 3,
  },
  {
    label: tI18n('paymentMethod.CVAT'),
    value: 4,
  },
]

// 报关方式
export const declareCustomsType = () => [
  { label: tI18n('declareCustoms.noNeed'), value: 0 },
  { label: tI18n('declareCustoms.normal'), value: 1 },
  { label: tI18n('declareCustoms.pay'), value: 2 },
  { label: tI18n('declareCustoms.tax'), value: 3 },
  {
    label: '9610',
    value: 4,
  },
  {
    label: '9710',
    value: 5,
  },
  {
    label: '9810',
    value: 6,
  },
  {
    label: '1210',
    value: 7,
  },
]

// 包裹类型
export const packageTypesList = () => [
  { label: tI18n('packageTypes.bundle'), value: 0 },
  { label: tI18n('packageTypes.file'), value: 1 },
  { label: tI18n('packageTypes.pak'), value: 2 },
]

// 目的地类型
export const DestinationTypes = () => [
  {
    label: tI18n('label.COUNTRY'),
    value: 0,
  },
  {
    label: tI18n('text.fbaWareHouse'),
    value: 1,
  },
  {
    label: tI18n('label.ZTD'),
    value: 2,
  },
  {
    label: tI18n('label.ProvinceCity'),
    value: 3,
  },
  {
    label: tI18n('label.OTHER'),
    value: 4,
  },
]

// 订单状态
export const OrderStatus = () => [
  { label: tI18n('text.listToBeApproved'), value: 0 },
  { label: tI18n('text.toBeCollected'), value: 5 },
  { label: tI18n('text.notTransported'), value: 1 },
  { label: tI18n('text.boxed'), value: 2 },
  { label: tI18n('text.shipped'), value: 3 },
  { label: tI18n('text.cancelledOrder'), value: 4 },
  { label: tI18n('text.signedFor'), value: 6 },
  { label: tI18n('text.returnedParts'), value: -1 },
]

// 预报单状态
export const PreOrderStatus = () => [
  { label: tI18n('text.notStored'), value: 0 },
  { label: tI18n('text.hasStored'), value: 1 },
]

// fba订单状态
export const FbaOrderStatus = () => [
  { label: tI18n('text.notStored'), value: 20 },
  { label: tI18n('text.hasStored'), value: 0 },
  { label: tI18n('text.pendingPay'), value: 5 },
  { label: tI18n('text.notTransported'), value: 1 },
  { label: tI18n('text.hasTransported'), value: 3 },
  { label: tI18n('text.hasReceived'), value: 6 },
  { label: tI18n('text.returnedParts'), value: -1 },
]

// 用户结算方式
export const SettlementTypes = () => ({
  '1': tI18n('text.settlementType.bill'),
  '2': tI18n('text.settlementType.week'),
  '3': tI18n('text.settlementType.month'),
})

// 揽件方式
export const orderSendTypeMap = () => ({
  0: tI18n('label.pkgTypeLabelExpress'),
  2: tI18n('label.pkgTypeLabelHouse'),
  1: tI18n('label.pkgTypeLabelHome'),
})

// 17track装单号状态
export const track17StatusMap = () => ({
  NotFound: tI18n('track17Status.notFound'),
  InfoReceived: tI18n('track17Status.infoReceived'),
  InTransit: tI18n('track17Status.inTransit'),
  Expired: tI18n('track17Status.expired'),
  AvailableForPickup: tI18n('track17Status.availableForPickup'),
  OutForDelivery: tI18n('track17Status.outForDelivery'),
  DeliveryFailure: tI18n('track17Status.deliveryFailure'),
  Delivered: tI18n('track17Status.delivered'),
  Exception: tI18n('track17Status.exception'),
})
