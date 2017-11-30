
import * as api from '../api'
import tokenManager from '../tokenManager'

const types = {
  INITIALIZE: 'INITIALIZE',
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  AUTHENTICATE: 'AUTHENTICATE',
  DEAUTHENTICATE: 'DEAUTHENTICATE',
}

const state = {
  isInitialized: false,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
}

const mutations = {
  [types.INITIALIZE]: state => {
    state.isInitialized = true
  },
  [types.AUTHENTICATE]: (state) => {
    state.isAuthenticated = true
    state.error = null
  },
  [types.DEAUTHENTICATE]: (state) => {
    state.isAuthenticated = false
    state.error = null
  },
  [types.LOGIN_BEGIN]: state => {
    state.isAuthenticating = true
    state.error = null
  },
  [types.LOGIN_SUCCESS]: state => {
    state.isAuthenticating = false
  },
  [types.LOGIN_FAIL]: (state, error) => {
    state.isAuthenticating = false
    state.error = error.message
  }
}

const actions = {
  initialize: ({commit}) => {
    const token = tokenManager.getAuthToken();

    if (token) {
      commit(types.AUTHENTICATE)
    }

    commit(types.INITIALIZE);
  },
  login: async ({commit}, credentials) => {
    commit(types.LOGIN_BEGIN)

    try {
      const results = await api.login(credentials)

      tokenManager.setAuthToken(results.data)
      commit(types.LOGIN_SUCCESS)
      commit(types.AUTHENTICATE)
    } catch (err) {
      console.log("LOGIN ERR", err.response);
      commit(types.LOGIN_FAIL, err)
    }
  },

  logout: ({commit}) => {
    setTimeout(() => {
      commit(types.DEAUTHENTICATE)
    })
  },

}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  isInitialized: state => state.isInitialized,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
