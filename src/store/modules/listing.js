import * as api from '../api'
import * as schema from '../schema'
import { normalize } from 'normalizr'

const types = {
  CREATE_BEGIN: 'CREATE_BEGIN',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAIL: 'CREATE_FAIL',
  UPDATE_BEGIN: 'UPDATE_BEGIN',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_FAIL: 'UPDATE_FAIL',
}

const state = {
  isLoading: false,
  error: null,
}

const mutations = {
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
  [types.UPDATE_BEGIN]: (state) => {
    state.isLoading = true
    state.error = null
  },
  [types.UPDATE_SUCCESS]: (state) => {
    state.isLoading = false
  },
  [types.UPDATE_FAIL]: (state, error) => {
    state.isLoading = false
    state.error = error.message
  },

}

const actions = {
  createListing: async ({commit, dispatch}, {eventureId, listingData}) => {
    commit(types.CREATE_BEGIN)

    try {
      const results = await api.createListing(eventureId, listingData)
      const normalizedData = normalize(results.data, schema.eventure)

      dispatch('updateEntities', normalizedData, {root: true})
      commit(types.CREATE_SUCCESS, results.data)

      return results
    } catch (err) {
      commit(types.CREATE_FAIL, err)
      throw err.response.data
    }
  },

  updateFeeSchedule: async ({commit, dispatch}, {eventureId, listingId, groupId, fees}) => {
    commit(types.UPDATE_BEGIN)

    try {
      const results = await api.updateFeeSchedule(eventureId, listingId, fees)
      const normalizedData = normalize(results.data, schema.eventure)

      dispatch('updateEntities', normalizedData, {root: true})
      commit(types.UPDATE_SUCCESS, results.data)
    } catch (err) {
      commit(types.UPDATE_FAIL, err)
    }
  },
}

const getters = {
  getListingBySlug: (state, getters, rootState, rootGetters) => (eventSlug, listingSlug) => {
    const eventure = rootGetters['eventure/getEventureBySlug'](eventSlug)
    
    if (!eventure) return null
    
    return eventure.listings.find(l => l.slug === listingSlug)
  },
  getListingsForEventure: (state, getters, rootState, rootGetters) => id => {
    const eventure = rootGetters['eventure/getEventureById'](id)

    return (eventure) ? eventure.listings : []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
