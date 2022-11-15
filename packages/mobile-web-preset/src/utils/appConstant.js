/**
 * appConstant
 *
 * @Author
 * @DATE    create on
 * @DESC    全局魔法变量
 */
const ENV_PREFIX =
  process.env.VUE_APP_BASE_MODE === 'prod'
    ? ''
    : `${process.env.VUE_APP_BASE_MODE}-`

// nas环境前缀
const NAS_ENV_PREFIX = process.env.VUE_APP_NAS_PREFIX
  ? `${process.env.VUE_APP_NAS_PREFIX}-`
  : `${process.env.VUE_APP_NAS_PREFIX}`

// app name
export const PROJECT_APP_NAME = 'mobile-web-preset'

// 请求头 key appname
export const KEY_HEADER_APP_NAME = 'app-name'

// 请求头 key 用户凭证
export const KEY_HEADER_SESSION = 'access-token'

// 请求头 nas 文件上传token
export const KEY_HEADER_NAS_AUTH = 'authorization'

export const APP_VAR = {
  // 当前语言的key
  LOCAL_STORAGE_LANG_KEY: 'bs_lang_key',
  // domain
  SESSION_STORAGE_DOMAIN_KEY: 'bs_lang_domain_key',
  // 用户凭证
  LOCAL_STORAGE_USER_KEY: 'bs_user_sessionId',
  // 微信公众号openId
  LOCAL_STORAGE_WECHAT_KEY: 'bs_user_openId',
  // 微信公众号appId
  LOCAL_STORAGE_WECHAT_APPID_KEY: 'bs_user_appId',
  // 业务公告详情
  LOCAL_STORAGE_BROADCAST_DETAIL_KEY: 'bs_cbc_broadcast_detail',
  // 预报单详情查看数据
  LOCAL_STORAGE_SHEET_DATA: 'bs_sheet_data_detail',
  // 预报单-常用收发通信息
  LOCAL_STORAGE_COMMON_INFO_KEY: 'bs_sheet_data_common_info',
  // 预报单-寄件信息
  LOCAL_STORAGE_SENDER_KEY: 'bs_sheet_data_sender',
  // 预报单-通知人信息
  LOCAL_STORAGE_NOTIFIER_KEY: 'bs_sheet_data_notifier',
  // 预报单-收件信息
  LOCAL_STORAGE_RECEIVER_KEY: 'bs_sheet_data_receiver',
  // 预报单-揽件信息
  LOCAL_STORAGE_PACKAGER_KEY: 'bs_sheet_data_packager',
  // 预报单-揽件信息
  LOCAL_STORAGE_PICK_INFO_KEY: 'bs_sheet_data_pick_info',
  // 预报单-申报信息
  LOCAL_STORAGE_REPORT_LIST_KEY: 'bs_sheet_data_report_list',
  // 预报单-申报信息-编辑
  LOCAL_STORAGE_REPORT_EDIT_KEY: 'bs_sheet_data_report_edit',
  // 收件信息 目的地 缓存数据
  LOCAL_STORAGE_RECEIVER_DST_GROUP_INDEX_KEY: 'bs_sheet_data_dst_index',
  // 订单-包裹信息
  LOCAL_STORAGE_PKG_INFO_KEY: 'bs_sheet_data_pkg_info',
  // 目的在缓存数据
  LOCAL_STORAGE_DST_INDEX_KEY: 'bs_sheet_data_dst_index_v2',
  // 国家地区缓存数据
  LOCAL_STORAGE_AREA_INDEX_KEY: 'bs_sheet_data_area_index_v2',
  // 地址区域信息
  LOCAL_STORAGE_AREA_KEY: 'bs_data_area_v2',
  // 待支付-支付数据
  LOCAL_STORAGE_PENDING_PAY_DATA_KEY: 'bs_data_pending_pay_data',
  // 预报单-发送成功 flag
  LOCAL_STORAGE_SEND_AFTER_KEY: 'bs_data_send_after_key',
  // 创建订单-发送成功 flag
  LOCAL_STORAGE_ORDER_CREATE_AFTER_KEY: 'bs_data_order_create_after_key',
  // 省市区选择回填
  LOCAL_STORAGE_ADDRESS_KEY: 'bs_data_address_area',
  // 快递单多个回填
  LOCAL_STORAGE_EXPRESS_LIST_KEY: 'bs_data_express_list',
  // 运费试算详情数据
  LOCAL_STORAGE_CALC_FREIGHT_KEY: 'bs_data_calc_freight_data',
  // 重量尺寸数据
  LOCAL_STORAGE_SIZE_WEIGHT_DATA: 'bs_data_size_weight',
}
// 默认分页配置
export const PAGINATION_DEFAULT = {
  // 页码
  pageNum: 1,
  // 每页个数
  pageSize: 10,
}
// nas 上传
export const NAS_UPLOAD_URL = ''
// nas 图片预览
export const NAS_IMG_URL = ''
// 未登录
export const NOT_LOGGED_IN = 4001
// 站点维护中（试用到期，没有续费等）
export const SITE_MAINTAIN = 4003
// 企业未开通跨运管家，请联系客服
export const COMPANY_NO_SUBSCRIBE = 4004
