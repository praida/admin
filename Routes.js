import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Err404 from './components/Err404';
import Landing from './views/Landing';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="*" component={Err404} />
    </Switch>
  </Router>
);

export default Routes;
