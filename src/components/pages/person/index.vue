<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created: function() {
    this.getPeople()
  },

  methods: {
    ...mapActions({
      getPeople: 'person/getPeople',
    }),
  },

  data () {
    return {}
  }
}
</script>

<style>
</style>
