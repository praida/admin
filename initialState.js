const initialState = {
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
  recordsAt: 0,
  records: [],

  // Search
  advancedSearch: false,

  // Edit
  nbNewFields: 0,
  newFields: [],
  editedFields: {},
  deletedFields: {},
  add: [],
  edit: {},
  remove: []
}

// Check for stored credentials
const credsStr = sessionStorage.getItem('creds')
if (credsStr) {
  const creds = JSON.parse(credsStr)
  console.log('Found stored creds', creds)
  initialState.user = creds.user
  initialState.pass = creds.pass
}

module.exports = exports = initialState