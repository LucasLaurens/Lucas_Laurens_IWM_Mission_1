import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    menu_active: false
}

const mutations = {
  CHANGE_ACTIVE: (state, active) => {
    state.menu_active = !active
  }
}

const getters = {
    menu_active: state => state.menu_active
}

const actions = {
  change_active: (store, active) => {
    store.commit('CHANGE_ACTIVE', active)
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: true
})

global.store = store

export default store