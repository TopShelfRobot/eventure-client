<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h2>Details for {{eventure.name}}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    eventure: function() { return this.$parent.eventure; },
  },

  data () {
    return { }
  }
}
</script>

<style>
</style>
