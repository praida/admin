import axios from 'axios'

const url = (route) => {
  return `${process.env.API_URL}/${route}`
}

const auth = (creds) => {
  return {
    username: creds.user,
    password: creds.pass
  }
}

module.exports = exports = {
  testCredentials: (dispatch, creds) => {
    dispatch({ type: 'loggingIn', value: true })
    return axios({
      url: url('testCredentials'),
      auth: auth(creds),
    })
      .then((res) => {
        dispatch({ type: 'loggedIn', creds })
        exports.pull(dispatch)
      }, (error) => {
        dispatch({ type: 'loginFailed', creds, error })
      })
      .then(() => {
        dispatch({ type: 'loggingIn', value: false })
      })
  },

  pull: (dispatch) => {
    return Promise.all([
      exports.getFields(dispatch),
      exports.getRecords(dispatch)
    ])
  },

  getFields: (dispatch) => {
    const credsStr = sessionStorage.getItem('creds')
    const creds = JSON.parse(credsStr)
    dispatch({ type: 'gettingFields', value: true })
    return axios({
      url: url('getFields'),
      auth: auth(creds)
    })
      .then((fields) => {
        dispatch({ type: 'gotFields', creds, fields })
      }, (error) => {
        dispatch({ type: 'getFieldsFailure', creds, error })
      })
      .then(() => {
        dispatch({ type: 'gettingFields', value: false })
      })
  },

  getRecords: (dispatch) => {
    const credsStr = sessionStorage.getItem('creds')
    const creds = JSON.parse(credsStr)
    dispatch({ type: 'gettingRecords', value: true })
    return axios({
      url: url('getRecords'),
      auth: auth(creds)
    })
      .then((records) => {
        dispatch({ type: 'gotRecords', creds, records })
      }, (error) => {
        dispatch({ type: 'getRecordsFailure', creds, error })
      })
      .then(() => {
        dispatch({ type: 'gettingRecords', value: false })
      })
  },

  saveChanges: (dispatch, changes) => {
    const credsStr = sessionStorage.getItem('creds')
    const creds = JSON.parse(credsStr)
    dispatch({ type: 'savingChanges', value: true, changes })
    return axios({
      method: 'post',
      url: url('saveChanges'),
      auth: auth(creds),
      data: changes
    })
      .then(() => {
        dispatch({ type: 'savedChanges', creds })
      }, (error) => {
        dispatch({ type: 'saveChangesFailed', creds, error })
      })
      .then(() => {
        dispatch({ type: 'savingChanges', value: false })
      })
  }
}
