import Vue from 'vue'

export const types = {
  UPDATE_ENTITIES: 'UPDATE_ENTITIES',
}

const state = {
  entities: {
    eventures: {},
    listings: {},
    groups: {},
  },
}

const mutations = {
  [types.UPDATE_ENTITIES]: (state, {entities}) => {
    Object.entries(entities).forEach(([type, table]) => {
      Object.entries(table).forEach(([id, entity]) => {
        const oldObj = state.entities[type][id] || {}
        const newObj = Object.assign(oldObj, entity)
        Vue.set(state.entities[type], id, newObj)
      })
    })
  }
}

const getters = {
  entities: state => state.entities,
}

const actions = {
  updateEntities({commit}, entities) {
    commit(types.UPDATE_ENTITIES, entities)
  }
}


export default {
  state,
  mutations,
  getters,
  actions,
}
