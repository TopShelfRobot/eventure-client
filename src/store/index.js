import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
// import eventure from './eventure'
import entities from './entities'
import eventure from './modules/eventure'
import listing from './modules/listing'
import registration from './modules/registration'
import person from './person'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const state = { }

const mutations = { }

const actions = { }

const getters = { }

const modules = {
  auth,
  entities,
  eventure,
  listing,
  person,
  registration,
}


export default new Vuex.Store({
  strict,
  state,
  mutations,
  actions,
  getters,
  modules,
})
