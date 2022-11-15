/**
 * App
 * @author  Yee
 * @date    2020/12/14
 * @desc    登录信息
 */
import { ajax } from '@/api/createApi'

/**
 * 获取登录信息
 * @return {AxiosPromise}
 */
export function fetchLoginUser () {
  return ajax({ url: '/auth/permission', loading: false })
}

/**
 * 获取用户可视菜单
 * @return {AxiosPromise}
 */
export function fetchUserMenu () {
  return ajax({ url: '/auth/menus', loading: false })
}
