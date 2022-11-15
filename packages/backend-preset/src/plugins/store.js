import Vue from 'vue'
import Vuex from 'vuex'
import permission from '@/store/modules/permission'
import user from '@/store/modules/user'
import app from '@/store/modules/app'

const modules = {
  permission,
  user,
  app,
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
})

export default store

export function useStore () {
  return store
}
