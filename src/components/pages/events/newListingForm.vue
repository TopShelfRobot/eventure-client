<template>
  <div style="width:500px; max-width:90vw;">
    <q-field :error="!!errors.name" :error-label="errors.name" >
      <q-input float-label="Name"  v-model="data.name" />
    </q-field>

    <q-field :error="!!errors.description" :error-label="errors.description">
      <q-input float-label="Short Description" :min-rows="5"  v-model="data.description" type="textarea" />
    </q-field>

    <q-field :error="!!errors.startDate" :error-label="errors.startDate" >
      <q-datetime v-model="data.startDate" type="date" float-label="Start Date" />
    </q-field>

    <q-field :error="!!errors.endDate" :error-label="errors.endDate">
      <q-datetime v-model="data.endDate" type="date" float-label="End Date" :disable="data.oneDayEvent" />
    </q-field>

    <q-field :error="!!errors.price" :error-label="errors.price">
      <q-input v-model="data.price" float-label="Price" />
    </q-field>

    <q-btn icon="create" color="primary" @click="onCreate">
      Create Listing
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
  props: ['errors'],
  methods: {
    onCreate: function() {
      const listingData = Object.assign({}, this.$data.data)

      this.$emit('submit', listingData)
    },
  },
  data () {
    return {
      data: {
        name: '',
        description: '',
        startDate: null,
        endDate: null,
        price: 0,
      },
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
