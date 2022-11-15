/**
 * auth
 * @author  Yee
 * @date    2021/3/22
 * @desc    权限控制相关
 */
 import Vue from 'vue'
 import store from '@/plugins/store'
 
 /**
  * 判断是否有权限
  * @param allowRole
  * @return {boolean}
  */
 function checkHasRole (allowRole) {
   // 当前角色权限
   const currentRole = store.getters['user/userRole']
   // 所需要权限(默认包括超级管理员)
   const allowRoles = ['super-admin', ...allowRole]
   // 默认没有权限
   let hasRole = false
   currentRole.forEach(role => {
     if (!hasRole) {
       hasRole = allowRoles.includes(role)
     }
   })
   return hasRole
 }
 
 // 权限控制指令, 默认超级管理有所有权限
 Vue.directive('auth', {
   bind: function (el, binding) {
   },
   // 当被绑定的元素插入到 DOM 中时……
   inserted: function (el, binding) {
     if (!checkHasRole(binding.value)) {
       Vue.nextTick(() => {
         el.style.display = 'none'
       })
     }
   },
   update: function (el, binding) {
     if (!checkHasRole(binding.value)) {
       Vue.nextTick(() => {
         el.style.display = 'none'
       })
     }
   },
 })
 