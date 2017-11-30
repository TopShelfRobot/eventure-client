

module.exports = {
  columns: [
    {
      label: 'Name',
      field: 'lastName',
      width: '100px',
      filter: true,
      sort: true,
      type: 'string',
      format: (value, row) => `${row.lastName}, ${row.firstName}`,
    },
  ],
  config: {
    rowHeight: '50px',
    title: 'Peeps',
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
      noData: 'You have no peeps',
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

