/**
 * fooApi
 * @author  Yee
 * @date    2022/10/25
 * @desc    服务
 */
import { ajax } from '@/api'

export default {
  /**
   * 获取列表
   * @param params
   */
  fetchPreOrderList(params: any) {
    return ajax({
      url: '/list',
      params,
    })
  },
  /**
   * 编辑数据
   * @param data
   */
  insEditPreOrderData(data: any) {
    return ajax.post({ url: '/detail', data })
  },
}
