import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Repositories from '../pages/repositories';
import Commits from '../pages/commits';

const Routes = () => (
  <Switch>
    <Route exact path="/repositories" component={Repositories} />
    <Route exact path="/commits" component={Commits} />
    <Redirect from="/" to="/repositories" />
  </Switch>
);

export default Routes;