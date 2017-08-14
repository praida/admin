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

    // Records
    case 'gettingRecords':
      newState.gettingRecords = action.value
      break
    case 'gotRecords':
      newState.gettingRecords = false
      newState.getRecordsFailed = false
      newState.recordsAt = Date.now()
      newState.records = action.records.data
      break
    case 'getRecordsFailure':
      newState.gettingRecords = false
      newState.getRecordsFailed = true
      break

    // Search
    case 'setAdvancedSearch':
      newState.advancedSearch = action.value
      break

    // Edit
    case 'addCol':
      newState.nbNewFields += 1
      newState.newFields.push('')
      break

    case 'removeRow':
      newState.remove.push(action.record._id)
      newState.records = newState.records.map((item) => {
        if (item._id === action.record._id) {
          item.isDeleted = true
        }
        return item
      })
      break
    case 'removeNewRow':
      newState.add[action.idx].isDeleted = true
      break
    case 'changeNewField':
      newState.newFields[action.idx] = action.value
      break
    case 'editField': {
      const field = action.field
      const id = field._id
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
    case 'addNewRecord':
      newState.add.push({ _id: action.idx })
      break;
    case 'editNewRecordOldField': {
      if (!newState.add[action.rowNb]) {
        newState.add[action.rowNb] = {}
      }
      newState.add[action.rowNb][action.field._id] = action.value
      break
    }
    case 'editNewRecordNewField':
      if (!newState.add[action.rowNb]) {
        newState.add[action.rowNb] = {}
      }
      if (!newState.add[action.rowNb].newFields) {
        newState.add[action.rowNb].newFields = []
      }
      newState.add[action.rowNb].newFields[action.idx] = action.value
      break
    case 'editRecordOldField':
      if (!newState.edit[action.record._id]) {
        newState.edit[action.record._id] = {}
      }
      newState.edit[action.record._id][action.field._id] = action.value
      break
    case 'editRecordNewField':

      if (!newState.edit[action.record._id]) {
        newState.edit[action.record._id] = {}
      }
      if (!newState.edit[action.record._id].newFields) {
        newState.edit[action.record._id].newFields = []
      }
      newState.edit[action.record._id].newFields[action.idx] = action.value
      break
    case 'undoAll':
      newState.nbNewFields = 0
      newState.newFields = []
      newState.add = []
      newState.edit = {}
      newState.remove = []
      newState.records = newState.records.map((item) => {
        if (item.isDeleted) {
          delete item.isDeleted
        }
        return item
      })
    case 'savedChanges':
      newState.nbNewFields = 0
      newState.newFields = []
      newState.add = []
      newState.edit = {}
      newState.remove = []
    default:
      console.warn('Unhandled action')
      break
  }
  global.state = newState
  return newState;
};

export const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
});
