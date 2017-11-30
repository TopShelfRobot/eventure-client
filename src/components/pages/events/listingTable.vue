<template>
  <div>
    <q-data-table
      ref="listingsTable"
      :data="listings"
      :config="config"
      :columns="columns"
      @refresh="handleTableRefresh"
      @rowclick="handleRowClick"
    >
    </q-data-table>
  </div>
</template>

<script>
import {
  QDataTable,
} from 'quasar'

export default {
  props: ['listings'],
  // mounted: function() {
  //   console.log("Mounted listingTable", this.$props)
  // },

  methods: {
    handleRowClick(listingData) { this.$emit('rowclick', listingData) },
    handleTableRefresh() {
      console.log("Refresh listing table!")
    }
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
        // {
        //   label: 'Start Date',
        //   field: 'startDate',
        //   width: '100px',
        //   filter: true,
        //   sort: (a, b) => (new Date(a)) - (new Date(b)),
        //   type: 'string',
        //   format: (value, row) => moment(new Date(value)).format('ll'),
        // },
        // {
        //   label: 'End Date',
        //   field: 'endDate',
        //   width: '100px',
        //   filter: true,
        //   sort: (a, b) => (new Date(a)) - (new Date(b)),
        //   type: 'string',
        //   format: (value, row) => moment(new Date(value)).format('ll'),
        // },
      ],
      config: {
        rowHeight: '50px',
        title: 'Listings',
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
          noData: 'You have no listings for this event',
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
    QDataTable,
  }
}
</script>

<style>
</style>
