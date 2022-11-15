/**
 * router
 * @author  Yee
 * @date    2020/8/11
 * @desc
 */
import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index'
import Blog from '../pages/blog'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/blog',
        component: Blog
      }
    ]
  })
}
