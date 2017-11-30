<template>
<div class="row justify-center">
  <div class="col-6">
    <q-card>
      <q-list :no-border="true">
        <q-collapsible opened icon="explore" label="Select Listing" v-if="showEventForm">
          <register-event-form 
            :eventureOptions="eventureOptions"
            :listingOptions="listingOptions"
            :eventureId="registration.eventureId"
            :listingId="registration.listingId"
            @changeEventure="handleSelectEventure"
            @changeListing="handleSelectListing"
            />
        </q-collapsible>
        <q-collapsible opened icon="explore" label="Select Participants">
          <register-participant-form
            @select="handleParticipantIdsChange"
            />
        </q-collapsible>
        <q-collapsible opened icon="perm_identity" label="Disclaimer">
          <register-disclaimer-form 
            @changeAgreement="handleChangeAgreement"
            />
        </q-collapsible>
        <q-collapsible opened icon="shopping_cart" label="Questionaire">
          <div>
            Content
          </div>
        </q-collapsible>
        <q-collapsible opened icon="shopping_cart" label="Payment">
          <div>
            <register-payment-form />
          </div>
        </q-collapsible>
        <q-collapsible opened icon="shopping_cart" label="Confirmation">
          <div>
            Content
          </div>
        </q-collapsible>
      </q-list>
      <q-btn @click="handleCreateRegistrationClick" :disabled="!canCreateRegisration">Register</q-btn>
    </q-card>

  </div>
  <pre>
    {{JSON.stringify($data, null, 2)}}
    </pre>
</div>
</template>

<script>
import {
  QCard,
  QBtn,
  QList,
  QCollapsible,
  Toast,
} from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import RegisterEventForm from './registerEventForm'
import RegisterParticipantForm from './register-participantForm'
import RegisterDisclaimerForm from './register-disclaimerForm'
import RegisterPaymentForm from './register-paymentForm'

export default {
  created() {
    this.$data.listingId = this.$route.params.listingId || this.$route.query.listingId

    this.showEventForm = !this.$data.listingId

    if (!this.activeEventures.length) {
      this.fetchEventures()
    }
  },
  data: () => ({
    registration: {
      eventureId: null,
      listingId: null,
      groupId: null,
      participantIds: [],
      acceptTerms: false,
    },
    showEventForm: true,
  }),
  validations: {
    registration: {
      eventureId: { required },
      listingId: { required },
      participantIds: {
        minLength: minLength(1),
        $each: { participantId: {required} }
      },
      acceptTerms: {
        isTrue: function(value) {
          return value === true
        }
      },
    },

    eventForm: ['registration.eventureId', 'registration.listingId'],
    participantsForm: ['registration.participantIds'],
    disclaimerForm: ['registration.acceptTerms']
  },
  computed: {
    ...mapGetters({
      activeEventures: 'eventure/getActiveEventures'
    }),
    canCreateRegisration() {
      return !this.$v.$invalid || true
    },
    participantId() {
      return this.$route.params.participantId || this.$route.query.participantId
    },
    eventureOptions() {
      return this.activeEventures.map(ev => ({label: ev.name, value: ev.id}))
    },
    listingOptions() {
      return this.$store.getters['listing/getListingsForEventure'](this.registration.eventureId)
        .map(listing => ({label: listing.name, value: listing.id}))
    },
  },
  methods: {
    ...mapActions({
      fetchEventures: 'eventure/fetch',
      createRegistration: 'registration/createRegistration',
    }),
    handleSelectEventure(eventureId) {
      this.registration.eventureId = eventureId
    },
    handleSelectListing(listingId) {
      this.registration.listingId = listingId
      // TODO: trigger fetch of questions
    },
    handleParticipantIdsChange(ids) {
      this.registration.participantIds = ids
    },
    handleChangeAgreement(agree) {
      this.registration.acceptTerms = agree
    },
    handleCreateRegistrationClick() {
      this.createRegistration(this.registration)
        .then((response) => {
          console.log("DONE", response)
        })
        .catch(err => {
          console.log("ERR", err)
          this.digestServerError(err)
        })
    },
    digestServerError(err) {
      let msg = err.message;
      if (err.details) {
        const lis = Object.values(err.details)
          .map(e => `<li>${e}</li>`)
          .join('')

        msg += `<ul>${lis}</ul>`
      }
      Toast.create.negative({html: msg, timeout: 10000})
    }
  },
  components: {
    QCard,
    QBtn,
    QList,
    QCollapsible,
    RegisterEventForm,
    RegisterParticipantForm,
    RegisterDisclaimerForm,
    RegisterPaymentForm,
    Toast,
  }
}
</script>

<style>
</style>
