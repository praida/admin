import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import cloneDeep from 'lodash.clonedeep'
import get from 'lodash.get'

import initialState from './initialState';

console.log('initialState', initialState)

const appReducer = (state = initialState, action) => {
  console.log('action', action)

  const newState = cloneDeep(state)

  switch (action.type) {
    // View
    case 'reviewChanges':
      newState.reviewing = true
      break

    // Autorization
    case 'userChanged':
      newState.user = action.user
      break
    case 'passChanged':
      newState.pass = action.pass
      break

    case 'loggingIn':
      newState.loggingIn = action.value
      break
    case 'loggedIn':
      global.sessionStorage.setItem('creds', JSON.stringify(action.creds))
      newState.loggedIn = true
      break
    case 'loginFailed':
      global.sessionStorage.removeItem('creds')
      newState.loggedIn = false
      break

    // Fields
    case 'gettingFields':
      newState.gettingFields = action.value
      break
    case 'gotFields':
      newState.gettingFields = false
      newState.getFieldsFailed = false
      newState.fieldsAt = Date.now()
      newState.fields = action.fields.data
      break
    case 'getFieldsFailure':
      newState.gettingFields = false
      newState.getFieldsFailed = true
      break;

    // Search
    case 'setAdvancedSearch':
      newState.advancedSearch = action.value
      break

    // Edit
    case 'addCol':
      newState.nbNewFields += 1
      newState.newFields.push('')
      break
    case 'changeNewField':
      newState.newFields[action.idx] = action.value
      break
    case 'editField': {
      const field = action.field
      const id = field._id
      console.log('typeof id', typeof id, id)
      const value = action.value
      if (value === '') {
        newState.deletedFields[id] = field
        delete newState.editedFields[id]
      } else {
        newState.editedFields[id] = field
        newState.editedFields[id].name = action.value
      }
      break
    }
    case 'undoAll':
      newState.nbNewFields = 0
      newState.newFields = []
      newState.add = []
      newState.edit = []
      newState.remove = []
    case 'savedChanges':
      newState.nbNewFields = 0
      newState.newFields = []
      newState.add = []
      newState.edit = []
      newState.remove = []

    default:
      break
  }
  global.state = newState
  return newState;
};

export const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
});
