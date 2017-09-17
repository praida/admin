import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import cloneDeep from 'lodash.clonedeep'
import get from 'lodash.get'

import initialState from './initialState';

const undoAll = (newState, bool) => {
  newState.ts = Date.now()
  newState.newFields = []
  localStorage.setItem('newFields', JSON.stringify(newState.newFields))
  newState.editedFields = {}
  localStorage.setItem('editedFields', JSON.stringify(newState.editedFields))
  newState.deletedFields = {},
  localStorage.setItem('deletedFields', JSON.stringify(newState.deletedFields))
  newState.add = []
  localStorage.setItem('add', JSON.stringify(newState.add))
  newState.edit = {}
  localStorage.setItem('edit', JSON.stringify(newState.edit))
  newState.remove = []
  localStorage.setItem('remove', JSON.stringify(newState.remove))
  if (bool) {
    newState.records = newState.records.map((item) => {
      if (item.isDeleted) {
        delete item.isDeletedb
      }
      return item
    })
    localStorage.setItem('records', JSON.stringify(newState.records))
  }
}

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
      newState.loginError = initialState.loginError
      break
    case 'loginFailed':
      global.sessionStorage.removeItem('creds')
      newState.loggedIn = false
      if (action.error.response) {
        newState.loginError = action.error.response.status
      } else {
        newState.loginError = 5
      }
      break

    // Fields
    case 'gettingFields':
      newState.gettingFields = action.value
      break
    case 'gotFields':
      newState.ts = Date.now()
      newState.gettingFields = false
      newState.getFieldsFailed = false
      newState.getFieldsError = initialState.getFieldsError
      newState.fieldsAt = Date.now()
      newState.fields = action.fields.data
      break
    case 'getFieldsFailure':
      newState.gettingFields = false
      newState.getFieldsFailed = true
      newState.getFieldsError = action.error
      break;

    // Records
    case 'gettingRecords':
      newState.gettingRecords = action.value
      break
    case 'gotRecords':
      newState.ts = Date.now()
      newState.gettingRecords = false
      newState.getRecordsFailed = false
      newState.getRecordsError = initialState.getRecordsError
      newState.recordsAt = Date.now()
      localStorage.setItem('recordsAt', JSON.stringify(newState.recordsAt))
      newState.records = action.records.data
      localStorage.setItem('records', JSON.stringify(newState.records))
      break
    case 'getRecordsFailure':
      newState.gettingRecords = false
      newState.getRecordsFailed = true
      newState.getRecordsError = action.error
      break

    // Search
    case 'setAdvancedSearch':
      newState.advancedSearch = action.value
      break

    // Edit
    case 'addCol':
      newState.newFields.push('')
      localStorage.setItem('newFields', JSON.stringify(newState.newFields))
      break

    case 'removeRow':
      newState.remove.push(action.record._id)
      localStorage.setItem('remove', JSON.stringify(newState.remove))
      break
    case 'removeNewRow':
      newState.add.splice(action.idx, 1)
      localStorage.setItem('add', JSON.stringify(newState.add))
      break
    case 'changeNewField':
      newState.newFields[action.idx] = action.value
      localStorage.setItem('newFields', JSON.stringify(newState.newFields))
      break
    case 'editField': {
      const field = action.field
      const id = field._id
      const value = action.value
      if (value === field.name) {
        if (newState.editedFields[id]) {
          delete newState.editedFields[id]
        }
      } else {
        newState.editedFields[id] = field
        newState.editedFields[id].name = value
      }
      localStorage.setItem('editedFields', JSON.stringify(newState.editedFields))
      if (value === '') {
        newState.deletedFields[id] = field
        localStorage.setItem('deletedFields', JSON.stringify(newState.deletedFields))
        delete newState.editedFields[id]
      } else {
        if (newState.deletedFields[id]) {
          delete newState.deletedFields[id]
        }
      }
      break
    }
    case 'addNewRecord':
      newState.add.push({ _id: action.idx })
      localStorage.setItem('add', JSON.stringify(newState.add))
      break;
    case 'editNewRecordOldField': {
      if (!newState.add[action.rowNb]) {
        newState.add[action.rowNb] = {}
      }
      newState.add[action.rowNb][action.field._id] = action.value
      localStorage.setItem('add', JSON.stringify(newState.add))
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
      localStorage.setItem('add', JSON.stringify(newState.add))
      break
    case 'editRecordOldField':
      const recordId = action.record._id
      const fieldId = action.field._id
      const value = action.value
      if (value === action.record[fieldId]) {
        if (newState.edit[recordId]) {
          delete newState.edit[recordId]
        }
      } else {
        if (!newState.edit[recordId]) {
          newState.edit[recordId] = {}
        }
        newState.edit[recordId][fieldId] = value
      }
      localStorage.setItem('edit', JSON.stringify(newState.edit))
      break
    case 'editRecordNewField':
      if (!newState.edit[action.record._id]) {
        newState.edit[action.record._id] = {}
      }
      if (!newState.edit[action.record._id].newFields) {
        newState.edit[action.record._id].newFields = []
      }
      newState.edit[action.record._id].newFields[action.idx] = action.value
      localStorage.setItem('edit', JSON.stringify(newState.edit))
      break
    case 'undoAll':
      undoAll(newState, true)
      break
    case 'savedChanges':
      undoAll(newState)
      newState.saveError = initialState.saveError
      break
    case 'saveChangesFailed':
      newState.saveError = action.error
      break
    case 'dismissSaveError':
      newState.saveError = initialState.saveError
      break
    case 'dismissLoginError':
      newState.loginError = initialState.loginError
      break
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
