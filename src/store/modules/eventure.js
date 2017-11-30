import * as api from '../api'
import * as schema from '../schema'
import { normalize, denormalize } from 'normalizr'

const types = {
  LIST_BEGIN: 'LIST_BEGIN',
  LIST_SUCCESS: 'LIST_SUCCESS',
  LIST_FAIL: 'LIST_FAIL',

  CREATE_BEGIN: 'CREATE_BEGIN',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAIL: 'CREATE_FAIL',
}

const state = {
  isLoading: false,
  error: null,
}

const mutations = {
  [types.LIST_BEGIN]: (state) => {
    state.isLoading = true
    state.error = null
  },
  [types.LIST_SUCCESS]: (state) => {
    state.isLoading = false
  },
  [types.LIST_FAIL]: (state, error) => {
    state.isLoading = false
    state.error = error.message
  },
  [types.CREATE_BEGIN]: (state) => {
    state.isLoading = true
    state.error = null
  },
  [types.CREATE_SUCCESS]: (state) => {
    state.isLoading = false
  },
  [types.CREATE_FAIL]: (state, error) => {
    state.isLoading = false
    state.error = error.message
  },
}

const actions = {
  fetch: async ({commit, dispatch}) => {
    commit(types.LIST_BEGIN);

    try {
      const results = await api.listEventures()
      const normalizedData = normalize(results.data, schema.eventures)

      dispatch('updateEntities', normalizedData, {root: true})
      commit(types.LIST_SUCCESS)
    } catch (err) {
      console.error("FetchError", err)
      commit(types.LIST_FAIL, err)
    }
  },

  create: async ({commit, dispatch}, data) => {
    commit(types.CREATE_BEGIN)

    try {
      const results = await api.createEventure(data)
      const normalizedData = normalize(schema.eventure, results.data)

      dispatch('updateEntities', normalizedData, {root: true})
      commit(types.CREATE_SUCCESS)
    } catch (err) {
      commit(types.CREATE_FAIL, err)
    }
  },
}

const getters = {
  getEventures: (state, getters, rootState, rootGetters) => {
    const entities = rootGetters.entities
    return Object.entries(entities.eventures || {}).map(([key, ev]) => denormalize(ev, schema.eventure, entities))
  },
  getActiveEventures: (state, getters) => {
    return getters.getEventures
  },
  getEventureById: (state, getters, rootState, rootGetters) => id => {
    const entities = rootGetters.entities
    const eventure = entities.eventures[id]

    return eventure
      ? denormalize(eventure, schema.eventure, entities)
      : null
  },
  getEventureBySlug: (state, getters, rootState, rootGetters) => slug => {
    const entities = rootGetters.entities
    const idx = Object.keys(entities.eventures).find(evId => entities.eventures[evId].slug === slug)
    return (idx) 
      ? denormalize(entities.eventures[idx], schema.eventure, entities)
      : null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
