<template>
  <tr>
    <td>{{label}}</td>
    <fee-schedule-cell 
      v-for="(fee, index) in fees" 
      :key="index" 
      :fee="fee" 
      @change="handleFeeChange"
      />
  </tr>
</template>


<script>
import FeeScheduleCell from './FeeScheduleCell'
import cloneDeep from 'lodash/cloneDeep'

const unique = (value, index, ary) => ary.indexOf(value) === index
const mostRecentFee = d => (recent, fee) => fee.feeDate <= d ? fee : recent

export default {
  props: {
    dates: {
      type: Array,
      required: true,
    },
    label: { },
    schedule: {
      eventureId: {
        type: String,
        required: true,
      },
      listingId: {
        type: String,
        required: true,
      },
      fees: {
        type: Array,
        required: true,
      }
    }
  },
  data: () => ({}),
  computed: {
    fees() {
      return this.projectFees(this.schedule.fees, this.dates)
    }
  },
  methods: {
    projectFees(fees, dates) {
      return dates
        .map(d => d.key)
        .filter(unique)
        .sort()
        .map(feeDate => this.calculateFee(fees, feeDate))
    },

    calculateFee(fees, feeDate) {
      const fee = (this.isWithinScheduleRange(fees, feeDate)) 
        ? fees.reduce(mostRecentFee(feeDate))
        : {restricted: true}

      return {
        feeDate,
        fee: fee.fee,
        derived: fee.feeDate !== feeDate,
        restricted: Boolean(fee.restricted),
      }
    },

    getCloseDate(fees) {
      const closeFee = fees.find(fee => fee.close)
      return closeFee ? closeFee.feeDate : null
    },

    isWithinScheduleRange(fees, testDate) {
      const closeDate = this.getCloseDate(fees)
      return fees[0].feeDate <= testDate && (!closeDate || closeDate >= testDate)
    },

    handleFeeChange(newFee, feeCell) {
      const feeIdx = this.schedule.fees.findIndex(fee => fee.feeDate === feeCell.feeDate)
      const updatedSchedule = cloneDeep(this.schedule)

      if (feeIdx === -1) {
        updatedSchedule.fees.push(Object.assign({}, feeCell, {fee: Number(newFee)}))
      } else {
        updatedSchedule.fees[feeIdx].fee = Number(newFee)
      }

      this.$emit('change', updatedSchedule)
    },

  },
  components: {
    FeeScheduleCell,
  }
}
</script>

<style>
</style>
