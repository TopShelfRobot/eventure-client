import * as api from '../api'
import * as schema from '../schema'
import { normalize } from 'normalizr'

const types = {
  FETCH_REGISTRATION_BEGIN: 'FETCH_REGISTRATION_BEGIN',
  FETCH_REGISTRATION_SUCCESS: 'FETCH_REGISTRATION_SUCCESS',
  FETCH_REGISTRATION_FAIL: 'FETCH_REGISTRATION_FAIL',

  CREATE_REGISTRATION_BEGIN: 'CREATE_REGISTRATION_BEGIN',
  CREATE_REGISTRATION_SUCCESS: 'CREATE_REGISTRATION_SUCCESS',
  CREATE_REGISTRATION_FAIL: 'CREATE_REGISTRATION_FAIL',
}

const state = {
  isLoading: false,
  error: null,
}

const mutations = {
  [types.FETCH_REGISTRATION_BEGIN]: state => {
    state.isLoading = true
    state.error = null
  },
  [types.FETCH_REGISTRATION_SUCCESS]: state => {
    state.isLoading = false
  },
  [types.FETCH_REGISTRATION_FAIL]: (state, error) => {
    state.isLoading = false
    state.error = error.message
  },
  [types.CREATE_REGISTRATION_BEGIN]: state => {
    state.isLoading = true
    state.error = null
  },
  [types.CREATE_REGISTRATION_SUCCESS]: state => {
    state.isLoading = false
  },
  [types.CREATE_REGISTRATION_FAIL]: (state, error) => {
    state.isLoading = false
    state.error = error.message
  },
}

const actions = {
  createRegistration: async ({commit, dispatch}, regData) => {
    commit(types.CREATE_REGISTRATION_BEGIN)
    
    try {
      const results = await api.createRegistration(regData)
      // const normalizedData = normalize(results.data, schema.registration)


      // dispatch('updateEntities', normalizedData, {root: true})
      commit(types.CREATE_REGISTRATION_SUCCESS, results.data)

      return results
    } catch (err) {
      commit(types.CREATE_REGISTRATION_FAIL, err)
      if (err.response && err.response.data) {
        throw err.response.data
      } else {
        throw err
      }
    }
  }
}

const getters = {
  
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
