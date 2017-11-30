<template>
  <div >
    <q-tabs slot="navigation" >
      <q-route-tab slot="title" icon="flag" :to="{name: 'eventure.home'}" append replace label="Details" />
      <q-route-tab slot="title" icon="art track" :to="{name: 'eventure.listings'}" append replace label="Listings" />
      <q-route-tab slot="title" icon="face" :to="{name: 'eventure.participants'}" replace label="Participants" />
      <q-route-tab slot="title" icon="shopping cart" :to="{name: 'eventure.registrations'}" replace label="Registrations" />
      <q-route-tab slot="title" icon="account balance" :to="{name: 'eventure.accounting'}" replace label="Accounting" />
      <q-route-tab slot="title" icon="settings applications" :to="{name: 'eventure.settings'}" replace label="Settings" />
    </q-tabs>

    <router-view :eventure="eventure" />
  </div>
</template>

<script>
import { QTabs, QRouteTab } from 'quasar'

export default {
  data () {
    return {}
  },

  computed: {
    eventure: function() { 
      const eventSlug = this.$route.params.eventSlug
      const eventure = this.$store.getters['eventure/getEventureBySlug'](eventSlug);

      // TODO: What happens when we don't find eventSlug?

      return eventure || {}
    },
  },

  components: {
    QTabs,
    QRouteTab,
  }
}
</script>

<style>
</style>
