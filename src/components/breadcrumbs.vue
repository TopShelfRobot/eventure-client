<template>
  <ul class="breadcrumb">
    <li v-for="(route, index) in path" :key="route.path">
      <breadcrumb :route="route"></breadcrumb>
    </li>
  </ul>
</template>

<script>
import Breadcrumb from './breadcrumb'
export default {
  computed: {
    path() { 
      return this.$route.matched.filter(r => r.meta && r.meta.bc )
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style>
</style>
