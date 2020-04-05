import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    items: [
      {
        menu_active: false
      }
    ]
}

const mutations = {
  CHANGE_ACTIVE: (state, item) => {
    state.items[0].menu_active = item
  }
}

const actions = {
  toggle_menu: (store, menu_active) => {
    store.commit('CHANGE_ACTIVE', menu_active)
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  strict: true
})

global.store = store
export default store