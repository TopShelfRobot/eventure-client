<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <div class="row">
      <div class="col-3">
        Here is profile picture
      </div>

      <div class="col">
        <q-card>
          <q-card-title>
            profile for {{person.firstName}} {{person.lastName}}
          </q-card-title>
          <q-card-separator />
          <q-card-main>

            <div class="row xs-gutter">
              <div class="col">
                <q-input float-label="First Name" v-model="personForm.firstName" />
              </div>
              <div class="col">
                <q-input float-label="Last Name" v-model="personForm.lastName" />
              </div>
            </div>

            <div class="row xs-gutter">
              <div class="col">
                <q-input float-label="email" v-model="personForm.email" />
              </div>
            </div>

            <div class="row xs-gutter">
              <div class="col">
                <q-datetime float-label="Date of Birth" v-model="personForm.birthDate" type="date" format="MMM D, YYYY" />
              </div>
              <div class="col">
                <q-input float-label="Age" v-model="age" :disabled="true" />
              </div>
              <div class="col">
                <q-input float-label="Joined" v-model="joined" :disabled="true" />
              </div>
            </div>

            <br>

            <div class="row justify-end">
              <div class="col">
                <q-btn class="pull-right" color="primary" @click="handleUpdateClick">Update</q-btn>
                <q-btn class="pull-right" flat @click="handleCancelClick">Cancel</q-btn>
              </div>
            </div>
            
          </q-card-main>
        </q-card>

      </div>
    </div>
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QField,
  QInput,
  QCheckbox,
  QDatetime,
  QBtn,
  date,
} from 'quasar'
import {mapActions} from 'vuex'

export default {
  mounted: function() {
    this.syncPerson(this.person)
  },
  computed: {
    person: function() { 
      const {personId} = this.$route.params
      const person = this.$store.getters['person/getPersonById'](personId);

      // TODO: What happens when we don't find personId?

      return person || {}
    },

    age: function() {
      if (!date.isValid(this.person.birthDate)) {
        return 0
      }

      const dob = new Date(this.person.birthDate)

      return date.getDateDiff(new Date(), dob, 'years')
    },

    joined: function() {
      return date.formatDate(this.person.createdAt, "MMM D, YYYY")
    }
  },

  methods: {
    ...mapActions({
      updatePerson: 'person/updatePerson'
    }),
    syncPerson: function(person) {
      this.$data.personForm = Object.assign({}, person)
    },
    handleUpdateClick: function() {
      this.updatePerson(this.$data.personForm)
        .then(res => {
          console.log("UPDATED PERSON", res)
        })
        .catch(err => {
          console.log("update person error", err)
          if (err.details) {
            this.$data.errors = err.details
          }
        })
    },
    handleCancelClick: function() {
      console.log("Cancel")
      this.syncPerson(this.person)
    }
  },

  watch: {
    person: function(newPerson) {
      this.syncPerson(newPerson)
    }
  },

  data () {
    return {
      personForm: Object.assign({}, this.person),
      errors: {},
    }
  },

  components: {
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QField,
    QInput,
    QCheckbox,
    QDatetime,
    QBtn,
  }
}
</script>

<style>
</style>
