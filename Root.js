import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import './styles/normalize.css';
import './styles/default.css';
import './styles/layout.css';

import Routes from './Routes';

const Root = props => (
  <IntlProvider locale="en">
    <Provider store={props.store}>
      <Routes />
    </Provider>
  </IntlProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
