<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created: function() {
    this.listAllEventures()
  },

  methods: {
    ...mapActions({
      listAllEventures: 'eventure/fetch',
    }),
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
