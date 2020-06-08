// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loadable } from 'HOCS';

const Home = Loadable({
  loader: () => import(/* webpackChunckName: "home" */ './pages/Home'),
});
const Packages = Loadable({
  loader: () => import(/* webpackChunckName: "home" */ './pages/Packages'),
});
const FourOhFour = Loadable({
  loader: () => import('./pages/FourOhFour'),
});

const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/home" component={Packages} />
    <Route component={FourOhFour} />
  </Switch>
);

export default createRoutes;
