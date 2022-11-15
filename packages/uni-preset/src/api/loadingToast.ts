/**
 * loadingToast
 * @author  Yee
 * @date    2022/10/25
 * @desc    请求提示器
 */
let count = 0

export default {
  /**
   * 显示加载
   */
  showLoading() {
    count++
    uni.showLoading({ title: '', mask: true })
    console.log(count)
  },
  /**
   * 隐藏加载
   * @param manual 是否手动关闭
   */
  hideLoading(manual: boolean = false) {
    count--
    if (count <= 0 || manual) {
      uni.hideLoading()
      count = 0
    }
    console.log(count)
  },
}
