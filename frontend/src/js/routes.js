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
const Login = Loadable({
  loader: () => import(/* webpackChunckName: "login" */ './pages/Login'),
});
const Settings = Loadable({
  loader: () => import(/* webpackChunckName: "settings" */ './pages/Settings'),
});
const ConfirmAccount = Loadable({
  loader: () => import('./pages/ConfirmAccount'),
});
const ResetPassword = Loadable({
  loader: () => import('./pages/ResetPassword'),
});
// import ResetPassword from './pages/ResetPassword';
const FourOhFour = Loadable({
  loader: () => import('./pages/FourOhFour'),
});

const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/home" component={Packages} />
    <Route exact path="/login" component={Login} />
    <Route path="/confirm" component={ConfirmAccount} />
    <Route path="/reset" component={ResetPassword} />
    <Route component={FourOhFour} />
  </Switch>
);

export default createRoutes;
