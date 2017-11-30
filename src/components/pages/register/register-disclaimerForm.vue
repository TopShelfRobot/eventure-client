<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div>Disclaimer goes here</div>
    <q-checkbox v-model="agree" @change="handleAgreeChange" label="I have read and agree to the disclaimer" />
    
  </div>
</template>

<script>
import {
  QCheckbox,
} from 'quasar'

export default {
  data: () => ({agree: false}),
  methods: {
    handleAgreeChange() {
      this.$emit('changeAgreement', this.agree)
    },
  },
  components: {
    QCheckbox,
  }
}
</script>

<style>
</style>
