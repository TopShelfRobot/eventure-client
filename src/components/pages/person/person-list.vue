<template>
  <div>
    <q-data-table
      ref="personTable"
      :data="people"
      :config="peopleTable.config"
      :columns="peopleTable.columns"
      @refresh="refresh"
      @rowclick="handleRowClick"
    >
    </q-data-table>
  </div>
</template>

<script>
import {
  QDataTable,
  QFixedPosition,
  QBtn,
  QIcon,
  QModal,
} from 'quasar'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      people: 'person/getPeople',
    })
  },

  methods: {
    refresh: function() {
      console.log("REFRESH")
    },
    handleRowClick: function(personData) {
      this.$router.push(`/people/${personData.id}`);
    }
  },

  data () {
    return {
      peopleTable: require('./peopleTable.config')
    }
  },

  components: {
    QDataTable,
    QFixedPosition,
    QBtn,
    QIcon,
    QModal,
  }

}
</script>

<style>
</style>
