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

  // Search
  advancedSearch: false,
  results: [],

  // Edit
  nbNewFields: 0,
  newFields: [],
  editedFields: {},
  add: [],
  edit: [],
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