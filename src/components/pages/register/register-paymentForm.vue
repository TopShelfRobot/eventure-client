<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-radio v-model="paymentChoice" val="pay-later" label="Pay Later" />
    <q-radio v-model="paymentChoice" val="pay-now" label="Pay Now" />
  </div>
</template>

<script>
import {
  QRadio,
} from 'quasar'
import { StripeCheckout } from 'vue-stripe'

export default {
  data: () => ({
    paymentChoice: 'pay-later'
  }),
  components: {
    StripeCheckout,
    QRadio,
  }
}
</script>

<style>
</style>
