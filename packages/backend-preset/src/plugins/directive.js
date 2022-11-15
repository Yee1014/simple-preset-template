/**
 * 自定义指令
 */
 import Vue from "vue";

 Vue.filter('formatRmb', function (value, num = 2) {
   value = value / 100
   value += ''
   const reg = value.includes('.') ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g
   value = value.replace(reg, '$1')
   return value.includes('.') ? value : (num ? `${value}.${Array(num).fill(0).toString().replace(',', '')}` : value)
 })
 