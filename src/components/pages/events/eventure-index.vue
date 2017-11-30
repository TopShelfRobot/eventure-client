<template>
  <div>
    <q-data-table
      ref="eventureListTable"
      :data="eventures"
      :config="config"
      :columns="columns"
      @refresh="refresh"
      @rowclick="handleRowClick"
    >
    </q-data-table>

    <q-modal ref="addPanel" position="right" :content-css="{height: '100%'}">
      <ev-new-eventure-form @submit="handleAddSubmit" />
    </q-modal>

    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" @click="onAddEventure">
        <q-icon name="add" />
      </q-btn>
    </q-fixed-position>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'
import {
  QDataTable,
  QFixedPosition,
  QBtn,
  QIcon,
  QModal,
} from 'quasar'
import EvNewEventureForm from './newEventureForm'

export default {
  mounted: function() {
    // this.$refs.eventureListTable.refresh()
  },
  methods: {
    ...mapActions({
      listAllEventures: 'eventure/fetch',
      createEventure: 'eventure/create',
    }),
    refresh: function(done) {
      this.listAllEventures().then(() => done())
    },
    onAddEventure: function() {
      this.$refs.addPanel.open();
    },
    handleRowClick: function(evData) {
      this.$router.push(`/events/${evData.slug}`);
    },
    handleAddSubmit: function(data) {
      this.createEventure(data);
      console.log("HANDLING SUBMIT", data)
    }
  },

  computed: {
    ...mapGetters({
      eventures: 'eventure/getEventures',
    })

  },

  data () {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          width: '100px',
          filter: true,
          sort: true,
          type: 'string',
        },
        {
          label: 'Start Date',
          field: 'startDate',
          width: '100px',
          filter: true,
          sort: (a, b) => (new Date(a)) - (new Date(b)),
          type: 'string',
          format: (value, row) => moment(new Date(value)).format('ll'),
        },
        {
          label: 'End Date',
          field: 'endDate',
          width: '100px',
          filter: true,
          sort: (a, b) => (new Date(a)) - (new Date(b)),
          type: 'string',
          format: (value, row) => moment(new Date(value)).format('ll'),
        },
      ],
      config: {
        rowHeight: '50px',
        title: 'Data Table',
        // noHeader: true,
        refresh: true,
        // columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 0,
        bodyStyle: {
          maxHeight: '500px'
        },
        responsive: true,
        // pagination: {
        //   rowsPerPage: 15,
        //   options: [5, 10, 15, 30, 50, 500]
        // },
        selection: 'multiple',
        messages: {
          noData: 'You have no events',
          noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
        },
        labels: {
          columns: 'Coluuuuumns',
          // allCols: 'All Colu',
          // rows: 'Rooows',
          selected: {
            singular: 'item selected.',
            plural: 'items selected.'
          },
          clear: 'clear',
          search: 'Search',
          all: 'All'
        }
      }
    }
  },

  components: {
    EvNewEventureForm,
    QDataTable,
    QFixedPosition,
    QBtn,
    QIcon,
    QModal,
  }
}
</script>

<style>
.q-data-table tr {
    cursor: pointer;
}
</style>
