<template>
  <div class="layout-padding row">
    <div class="col-6">
      <q-field icon="directions run" >
        <q-select 
          float-label="Select an Event"
          :value="eventureId" 
          :options="eventureOptions" 
          @change="handleEventureChange" 
          />
      </q-field>
      <q-field icon="directions walk" >
        <q-select 
          float-label="Select Listing"
          :value="listingId" 
          :options="listingOptions" 
          @change="handleListingChange" 
          :disabled="!listingOptions.length" 
          />
      </q-field>
    </div>

    <div class="col-6"></div>
  </div>
</template>

<script>
import {
  QSelect,
  QField,
  QInput,
} from 'quasar'

export default {
  props: ['eventureOptions', 'listingOptions', 'eventureId', 'listingId'],
  data: () => ({
    
  }),
  methods: {
    handleEventureChange(eventureId) {
      this.$emit("changeEventure", eventureId)
    },
    handleListingChange(listingId) {
      this.$emit("changeListing", listingId)
    },
    handleGroupChange() {

    },
  },
  components: {
    QSelect,
    QField,
    QInput,
  }
}
</script>

<style>
</style>
