<template>
  <div style="width:500px; max-width:90vw;">
    <q-field
      icon="check circle"
      label="Basic Information"
    >
      <q-input float-label="Name" v-model="data.name" />
      <br>
      <q-input float-label="Short Description" :min-rows="5"  v-model="data.description" type="textarea" />
    </q-field>

    <q-field 
      label="Event Dates"
      icon="date range">
      
      <q-datetime v-model="data.startDate" type="date" float-label="Start Date" />
      <br>
      <q-datetime v-model="data.endDate" type="date" float-label="End Date" :disable="data.oneDayEvent" />
      <br>
      <q-checkbox v-model="data.oneDayEvent" label="One-Day Event" />
    </q-field>

    <q-btn icon="create" color="primary" @click="onCreate">
      Create Eventure
    </q-btn>
  </div>
  
</template>

<script>
import {
  QField,
  QInput,
  QCheckbox,
  QDatetime,
  QBtn,
} from 'quasar'

export default {
  methods: {
    onCreate: function() {
      const eventureData = Object.assign({}, this.$data.data)

      this.$emit('submit', eventureData)
    },
  },
  data () {
    return {
      data: {
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        oneDayEvent: true
      },
      errors: {}
    }
  },

  components: {
    QField,
    QInput,
    QCheckbox,
    QDatetime,
    QBtn,
  }
}
</script>

<style>
</style>
