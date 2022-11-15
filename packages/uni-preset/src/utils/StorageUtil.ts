/**
 * StorageUtil
 * @author  Yee
 * @date    2022/10/25
 * @desc    缓存工具
 */
export default {
  /**
   * 存储
   * @param key
   * @param value
   */
  setItem(key: string, value: any) {
    try {
      uni.setStorageSync(key, value)
    } catch (e) {
      // console.log('', e)
    }
  },
  /**
   * 获取
   * @param key
   */
  getItem(key: string) {
    try {
      return uni.getStorageSync(key)
    } catch (e) {
      // error
    }
  },
  /**
   * 删除
   * @param key
   */
  removeItem(key: string) {
    try {
      uni.removeStorageSync(key)
    } catch (e) {
      // error
    }
  },
  /**
   * 清空所有缓存
   */
  clearAll() {
    try {
      uni.clearStorageSync()
    } catch (e) {
      // error
    }
  },
}
