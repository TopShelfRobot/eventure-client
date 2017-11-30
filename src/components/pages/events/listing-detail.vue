<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-card>
      <q-card-main>
        Hello
      </q-card-main>
    </q-card>

    <fee-schedule 
      :listings="listingsAsArray" 
      @change="handleFeeScheduleChange"
      />
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QCardMain,
} from 'quasar'
import { mapActions } from 'vuex';
import FeeSchedule from '../../FeeSchedule'

export default {
  data: () => ({
  }),
  computed: {
    listing: function() {
      const {eventSlug, listingSlug} = this.$route.params

      return this.$store.getters['listing/getListingBySlug'](eventSlug, listingSlug)
    },
    listingsAsArray: function() { return (this.listing) ? [this.listing] : [] },
  },
  methods: {
    ...mapActions({
      updateFeeSchedule: 'listing/updateFeeSchedule',
    }),
    handleFeeScheduleChange(updatedSchedule) {
      this.updateFeeSchedule(updatedSchedule)
    },
  },
  components: {
    QCard,
    QCardTitle,
    QCardMain,
    FeeSchedule,
  }
}
</script>

<style>
</style>
