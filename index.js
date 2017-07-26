/* eslint-disable no-undef */
import 'es6-promise'; // polyfill for promises for IE11
import 'babel-polyfill'; // polyfill for ES6 features
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';

import Root from './Root';
import { rootReducer } from './rootReducer';

// create the store
let middleware
if (('production' !== process.env.NODE_ENV) && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}
const store = createStore(rootReducer, middleware);

// render the main component
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') // eslint-disable-line comma-dangle
);
