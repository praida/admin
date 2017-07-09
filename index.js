/* eslint-disable no-undef */
import 'es6-promise'; // polyfill for promises for IE11
import 'whatwg-fetch'; // polyfill for fetch for IE11 & Safari
import 'babel-polyfill'; // polyfill for ES6 features
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Root from './Root';
import { rootReducer } from './rootReducer';
import { sagas } from './rootSaga';

// create the store
const sagaMiddleware = createSagaMiddleware();
let middleware = applyMiddleware(sagaMiddleware);
if (('production' !== process.env.NODE_ENV) && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}
const store = createStore(rootReducer, middleware);
sagaMiddleware.run(sagas);

// render the main component
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') // eslint-disable-line comma-dangle
);
