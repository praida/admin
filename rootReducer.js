import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const initialState = {};

const appReducer = (state = initialState, action) => {
  const newState = {
    ...state,
  };
  switch (action.type) {
    default:
      break;
  }
  return newState;
};

export const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer,
});
