<template>
  <a>
    {{display}}
  </a>
</template>

<script>
export default {
  props: ['route'],
  computed: {
    display() { 
      return this.route.meta.bc.display 
    },
  },
}
</script>

<style>
</style>
