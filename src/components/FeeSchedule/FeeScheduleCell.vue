<template>
  <td>
    <a class="fee" :class="{'light-paragraph': fee.derived, 'strong': !fee.derived}" >
      {{fee.fee}}
      
      <q-popover @close="handleFeeEditClose" @open="handleFeeEditOpen" ref="feeEditPopover">
        <div class="pad">
          <h6>Update Fee</h6>
          <q-input 
            prefix="$" 
            v-model="editValue" 
            :error="$v.editValue.$error"
            @change="$v.editValue.$touch"
            />
          <q-btn flat @click="$refs.feeEditPopover.close()">Cancel</q-btn>
          <q-btn flat @click="handleFeeEditSave" :disabled="$v.editValue.$error">Save</q-btn>
        </div>
      </q-popover>
    </a>
  </td>
</template>

<script>
import {
  QPopover,
  QInput,
  QBtn,
} from 'quasar'
// import numeric from 'vuelidate/lib/validators/numeric'
// import isNumber from 'lodash/isNumber'


export default {
  props: {
    fee: {
      feeDate: {
        type: String,
        validator: val => (/\d{4}\-\d{1,2}\-\d{1,2}/).test(val),
        required: true,
      },
      fee: {
        type: Number,
      },
      derived: {
        type: Boolean,
      },
      restricted: {
        type: Boolean,
      }
    }
  },
  methods: {
    handleFeeEditOpen: function() {
      this.$data.editValue = this.fee.fee
    },
    handleFeeEditClose: function() {
    },
    handleFeeEditSave: function() {
      if (this.editValue !== this.fee.fee) {
        this.$emit('change', this.editValue, this.fee)
      }
      this.$refs.feeEditPopover.close()
    }
  },
  data () {
    return {
      editValue: 1
    }
  },

  validations: {
    editValue: { 
      isMoney: (val) => (/^\-?\d+(?:\.\d{0,2})?$/).test(val)
    },
  },

  components: {
    QPopover,
    QInput,
    QBtn,
  }
}
</script>

<style scoped>
  a.fee {
    color: #0c0c0c;
    border-bottom: 2px dotted;
  }

  .pad {
    padding: 20px;
  }
</style>
