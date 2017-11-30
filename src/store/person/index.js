import * as api from '../api'

const types = {
  LIST_PEOPLE_BEGIN: 'LIST_PEOPLE_BEGIN',
  LIST_PEOPLE_SUCCESS: 'LIST_PEOPLE_SUCCESS',
  LIST_PEOPLE_FAIL: 'LIST_PEOPLE_FAIL',
  UPDATE_PERSON_BEGIN: 'UPDATE_PERSON_BEGIN',
  UPDATE_PERSON_SUCCESS: 'UPDATE_PERSON_SUCCESS',
  UPDATE_PERSON_FAIL: 'UPDATE_PERSON_FAIL',
}

const state = {
  list: [],
  me: {},
  loading: {
    list: false,
    update: false,
  },
  errors: {
    list: null,
    update: null,
  }
}

const mutations = {
  [types.LIST_PEOPLE_BEGIN]: (state) => {
    state.loading.list = true
    state.errors.list = null
  },
  [types.LIST_PEOPLE_SUCCESS]: (state, people) => {
    state.loading.list = false
    state.list = people
  },
  [types.LIST_PEOPLE_FAIL]: (state, err) => {
    state.loading.list = false
    state.errors.list = err.message
  },
  [types.UPDATE_PERSON_BEGIN]: (state) => {
    state.loading.update = true
    state.errors.update = null
  },
  [types.UPDATE_PERSON_SUCCESS]: (state, person) => {
    state.loading.update = false
    const idx = state.list.findIndex(p => p.id === person.id)

    if (idx === -1) {
      state.list.push(person)
    } else {
      state.list.splice(idx, 1, person)
    }
  },
  [types.UPDATE_PERSON_FAIL]: (state, err) => {
    state.loading.update = false
    state.errors.update = err.message
  },
}

const actions = {
  getPeople: ({commit}) => {
    commit(types.LIST_PEOPLE_BEGIN)

    return api.getPeople()
      .then(results => {
        commit(types.LIST_PEOPLE_SUCCESS, results.data)
        
        return results.data
      })
      .catch(err => {
        commit(types.LIST_PEOPLE_FAIL, err)
      })
  },

  updatePerson: ({commit}, personData) => {
    commit(types.UPDATE_PERSON_BEGIN)

    return api.updatePerson(personData)
      .then(results => {
        commit(types.UPDATE_PERSON_SUCCESS, results.data)

        return results.data
      })
      .catch(err => {
        commit(types.UPDATE_PERSON_FAIL, err)
      })
  },
}

const getters = {
  getPeople: state => state.list,
  getPersonById: state => (personId) => state.list.find(p => p.id === personId),
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

