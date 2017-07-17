import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import cloneDeep from 'lodash.clonedeep'

const initialState = {
  user: '',
  pass: '',
  fields: [],
  nbNewFields: 0,
  newFields: [],
  results: [],
  advancedSearch: false,
  add: [],
  edit: [],
  remove: [],
  reviewing: false
};

const appReducer = (state = initialState, action) => {
  const newState = cloneDeep(state)

  switch (action.type) {
    case 'userChanged':
      newState.user = action.user
      break
    case 'passChanged':
      newState.pass = action.pass
      break
    case 'saveVersions':
      console.log('action', action)
      break
    case 'failGetVersions':
      console.error('action', action)
      break
    case 'setAdvancedSearch':
      newState.advancedSearch = action.value
      break
    case 'addCol':
      newState.nbNewFields += 1
      newState.newFields.push('')
      break
    case 'changeNewField':
      newState.newFields[action.idx] = action.value
      break
    case 'reviewChanges':
      newState.reviewing = true
      break
    case 'undoAll':
      newState.nbNewFields = 0
      newState.newFields = []
      newState.add = []
      newState.edit = []
      newState.remove = []
    default:
      break
  }
  return newState;
};

export const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
});
