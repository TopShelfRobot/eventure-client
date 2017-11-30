<template>
  <q-card>
    <q-card-title>
      Fee Schedule

      <q-icon slot="right" name="more_vert">
        <q-popover ref="popover">
          <q-list link class="no-border">
            <q-item @click="$refs.newDateModal.open()">
              <q-item-main label="Add Date" />
            </q-item>
          </q-list>
        </q-popover>
      </q-icon>
    </q-card-title>

    <q-card-main>
      <table class="q-table cell-separator loose">
        <thead>
          <th></th>
          <fee-schedule-date-header v-for="date in dates" :key="date.key" :date="date" />
        </thead>
        <tbody>
          <fee-schedule-row 
            v-for="schedule in feeScheduleRows" 
            :key="schedule.name" 
            :label="schedule.name"
            :schedule="schedule" 
            :dates="dates" 
            @change="handleFeeChange" />
        </tbody>
      </table>
    </q-card-main>

    <q-modal :content-css="{padding: '30px'}" ref="newDateModal">
      <h6>Select a date to apply new pricing</h6>
      <q-datetime v-model="newDate" type="date" format="YYYY-MM-DD" @change="handleNewDateChange" />
    </q-modal>

  </q-card>





</template>

<script>
import parseDate from 'date-fns/parse'
import formatDate from 'date-fns/format'
import FeeScheduleDateHeader from './FeeScheduleDateHeader'
import FeeScheduleCell from './FeeScheduleCell'
import FeeScheduleRow from './FeeScheduleRow'
import {
  QCard,
  QCardTitle,
  QIcon,
  QCardMain,
  QPopover,
  QList,
  QItem,
  QItemMain,
  QDatetime,
  QModal,
  QBtn,
} from 'quasar'

const unique = (value, index, ary) => ary.indexOf(value) === index

export default {
  props: {
    listings: { 
      type: Array, 
      required: true 
    },
  },
  data: () => ({
    newDate: null,
    additionalDates: [],
  }),
  computed: {
    dates() { 
      return this.getAllDates(this.listings, this.additionalDates) 
    },
    feeScheduleRows() {
      return this.convertListingsToRows() 
    },
  },

  methods: {
    convertListingsToRows() {
      return this.listings.map(listing => ({
        name: listing.name,
        eventureId: listing.eventureId,
        listingId: listing.id,
        fees: listing.feeSchedule,
      }))
    },

    
    /**
    * Extract all unique dates from a collection of listings
    * 
    * @param {Array} listings  A collection of listings
    * @param {Array} additionalDates array of ISO 8601 formatted dates
    * @returns {Array} An array of all unique dates
    */
    getAllDates(listings, additionalDates) {
      if (!listings) return [];

      const dates = listings
        // Pull out all the fee schedules from the listings
        .map(l => l.feeSchedule)
        // Combine all fee schedule items in to one list
        .reduce((schedules, fs) => schedules.concat(fs), [])
        // pull out all the dates
        .map(fsi => fsi.feeDate)
        // Combine them with any additional dates
        .concat(additionalDates)
        .filter(unique)
        .sort()
        .map(d => ({
          key: d,
          display: formatDate(parseDate(d), 'MMM D')
        }))

      return dates
    },

    handleNewDateChange: function(newDate) {
      this.addFeeScheduleDate(newDate)
      this.$refs.newDateModal.close()
    },

    handleFeeChange: function(updatedRow) {
      this.$emit('change', updatedRow)
    },

    addFeeScheduleDate: function(newDate) {
      newDate = formatDate(parseDate(newDate), 'YYYY-MM-DD')
      
      // Make sure that it does not already exist
      const existingDate = this.dates.find(d => d.key === newDate) || this.additionalDates.find(d => d === newDate)

      if (existingDate) {
        // TODO: notify the user via some other method
        console.log("DATE already exists in array")
        return
      }

      // Insert it in to additional dates array
      this.additionalDates.push(newDate)
    },

  },

  components: {
    FeeScheduleDateHeader,
    QCard,
    QCardTitle,
    QIcon,
    QCardMain,
    QPopover,
    QList,
    QItem,
    QItemMain,
    QDatetime,
    QModal,
    QBtn,
    FeeScheduleCell,
    FeeScheduleRow,
  }
}
</script>

<style>
</style>
