const pkg = require('./package.json')
const edits = require('./edits.js')

const initialState = {
  // Control
  ts: 0,

  // View
  reviewing: false,

  // Menu
  appVersion: pkg.version,
  menuHidden: false,

  // Authorization
  user: '',
  pass: '',
  loggingIn: false,
  loggedIn: false,
  loginFailed: false,
  loginError: 0,

  // Fields
  gettingFields: false,
  getFieldsFailed: false,
  getFieldsError: null,
  fieldsAt: 0,
  fields: [],

  // Records
  gettingRecords: false,
  getRecordsFailed: false,
  getRecordsError: null,

  // Search
  advancedSearch: false,

  // Edit
  ...edits,

  // Save
  saveError: null
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