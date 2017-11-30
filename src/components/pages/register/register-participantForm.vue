<template>
  <div class="layout-padding">
    <search-participants @select="handleMainParticipantSelect" />
    <ul>
      <li v-for="participant in participants" :key="participant.id">
        <q-checkbox v-model="participantIds" :val="participant.id" :label="participant.fullname" />
      </li>
    </ul>
  </div>
</template>

<script>
import {
  QField,
  QAutocomplete,
  QSearch,
  QCheckbox,
} from 'quasar'
import SearchParticipants from '../../search-participants'

export default {
  data: () => ({
    terms: '',
    participants: [],
    participantIds: [],
  }),
  methods: {
    handleMainParticipantSearch(terms, done) {
      console.log("SEARCh", terms)
      done([])
    },
    handleMainParticipantSelect(participant) {
      // TODO: Go fetch all house members
      this.participants = [{
        id: participant.value,
        fullname: participant.label
      }]
    }
  },
  watch: {
    participantIds(ids) {
      this.$emit('select', ids)
    }
  },
  components: {
    QField,
    QAutocomplete,
    QSearch,
    SearchParticipants,
    QCheckbox
  }
}
</script>

<style>
</style>
