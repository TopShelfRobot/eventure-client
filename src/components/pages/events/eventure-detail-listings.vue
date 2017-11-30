<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h2>Listings</h2>

    <listing-table :listings="listings" @rowclick="handleRowClick" />

    <q-modal ref="addListingPanel" :content-css="{padding: '30px'}">
      <h4>Add a Listing</h4>
      <ev-new-listing-form :errors="newListingErrors" @submit="handleAddSubmit" />
    </q-modal>

    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" @click="handleAddListingClick">
        <q-icon name="add" />
      </q-btn>
    </q-fixed-position>
  </div>
</template>

<script>
import {
  QFixedPosition,
  QBtn,
  QIcon,
  QModal,
} from 'quasar'
import ListingTable from './listingTable'
import EvNewListingForm from './newListingForm'
import { mapActions } from 'vuex'

export default {
  
  methods: {
    ...mapActions({
      createListing: 'eventure/createListing',
    }),
    handleAddListingClick: function() {
      this.$refs.addListingPanel.open()
    },
    handleAddSubmit: function(listingData) {
      const eventSlug = this.$route.params.eventSlug
      const eventure = this.$store.getters['eventure/getEventureBySlug'](eventSlug);
      const payload = {eventureId: eventure.id, listingData}

      this.createListing(payload)
        .then(res => {
          this.$refs.addListingPanel.close()
        })
        .catch(err => {
          if (err.details) {
            this.$data.newListingErrors = err.details
          }
        })
    },
    handleRowClick: function(listingData) {
      const eventSlug = this.$route.params.eventSlug
      
      this.$router.push(`/events/${eventSlug}/listings/${listingData.slug}`);
    },
  },

  computed: {
    listings: function() {
      const eventSlug = this.$route.params.eventSlug
      const eventure = this.$store.getters['eventure/getEventureBySlug'](eventSlug);

      return (eventure && eventure.listings) ? eventure.listings : []
    },
  },

  data () {
    return {
      newListingErrors: {}
    }
  },

  components: {
    QFixedPosition,
    QBtn,
    QIcon,
    ListingTable,
    QModal,
    EvNewListingForm
  }
}
</script>

<style>
</style>
