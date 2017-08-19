const edits = require('./edits.js')

const initialState = {
  // Control
  ts: 0,

  // View
  reviewing: false,

  // Authorization
  user: '',
  pass: '',
  loggingIn: false,
  loggedIn: false,
  logginFailed: false,

  // Fields
  gettingFields: false,
  getFieldsFailed: false,
  fieldsAt: 0,
  fields: [],

  // Records
  gettingRecords: false,
  getRecordsFailed: false,

  // Search
  advancedSearch: false,

  // Edit
  ...edits
}

// Check for stored credentials
const credsStr = sessionStorage.getItem('creds')
if (credsStr) {
  const creds = JSON.parse(credsStr)
  initialState.user = creds.user
  initialState.pass = creds.pass
}

Object.keys(edits).forEach((itemName) => {
  const item = localStorage.getItem(itemName)
  if (item) {
    initialState[itemName] = JSON.parse(item)
  }
})

module.exports = exports = initialState