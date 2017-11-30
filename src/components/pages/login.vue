<template>
  <q-card inline style="width: 500px">
    <q-card-media>
      <img src="~assets/donuts.png">
    </q-card-media>
    <q-card-title>
      ??
      <div slot="right" class="row items-center">
        <q-icon name="place" /> 250 ft
      </div>
    </q-card-title>
    <q-card-main>
      <q-input v-model="email" float-label="Email" />
      <q-input v-model="password" float-label="Password" />
      <q-btn @click="onLogin">
          <q-icon name="account box" />
            Login
      </q-btn>
    </q-card-main>
    <q-card-separator />
    <q-card-actions>
      <q-btn flat round small><q-icon name="event" /></q-btn>
      <q-btn flat>5:30PM</q-btn>
      <q-btn flat>7:30PM</q-btn>
      <q-btn flat>9:00PM</q-btn>
      <q-btn flat color="primary">Reserve</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardMedia,
  QCardTitle,
  QIcon,
  QCardMain,
  QCardSeparator,
  QCardActions,
  QBtn,
  QInput,
} from 'quasar'
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    onLogin: function(a, b) {
      const credentials = {
        email: this.$data.email,
        password: this.$data.password
      }

      this.login(credentials)
        .then(res => {
          const {query} = this.$route;
          const redirect = (query && query.redirect) ? query.redirect : '/'

          this.$router.push(redirect);
        })
    }
  },
  data () {
    return {
      email: '',
      password: '',
    }
  },

  components: {
    QCard,
    QCardMedia,
    QCardTitle,
    QIcon,
    QCardMain,
    QCardSeparator,
    QCardActions,
    QBtn,
    QInput,
  }
}
</script>

<style>
</style>
