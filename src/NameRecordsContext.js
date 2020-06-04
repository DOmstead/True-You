import React from 'react'

const NameRecordsContext = React.createContext({
  nameRecords: [],
  addNameRecord: () => {},
  deleteNameRecord: () => {},
  updateNameRecord: () => {},
})

export default NameRecordsContext
