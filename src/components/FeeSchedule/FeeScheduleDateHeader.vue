<template>
  <th>{{date.display}}</th>
</template>

<script>
export default {
  props: {
    date: {type: Object, required: true}
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
