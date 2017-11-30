<template>
  <q-search v-model="terms" placeholder="Search Participants">
    <q-autocomplete 
      float-label="Choose a main participant"
      @search="handleSearch"
      @selected="handleSelect"  
      :min-characters="3"
      />
  </q-search>
</template>

<script>
import {
  QSearch,
  QAutocomplete,
} from 'quasar'
import * as api from '../store/api'

export default {
  data: () => ({
    terms: ''
  }),
  methods: {
    async handleSearch(terms, done) {
      try {
        const {data: people, status, headers} = await api.searchPeople(terms)
        const options = people
          .map(p => ({
            label: `${p.lastName}, ${p.firstName}`,
            value: p.id
          }))
          .sort((a, b) => a.label < b.label ? -1 : 1)

        done(options)
      } catch (err) {
        console.error(err)
        done([])
      }
    },
    handleSelect(participant) {
      this.terms = participant.label
      this.$emit('select', participant)
    }
  },
  components: {
    QSearch,
    QAutocomplete,
  }
}
</script>

<style>
</style>
