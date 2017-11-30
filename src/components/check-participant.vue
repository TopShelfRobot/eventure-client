<template>
  <q-checkbox :val="participant.id" label="fullname" />
</template>

<script>
import {
  QCheckbox,
} from 'quasar'

export default {
  props: {
    participant: {
      type: Object,
      required: true
    }
  },
  calculated: {
    fullname() {
      return this.participant.lastName + ', ' + this.participant.firstName
    }
  },
  components: { QCheckbox, }
}
</script>

<style>
</style>
