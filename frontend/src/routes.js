import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Logon from './pages/Logon';
import LogonConfirmation from './pages/LogonConfirmation';
import HomePage from './pages/HomePage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />

        <Route path="/register" exact component={Register} />
        <Route path="/logon" exact component={Logon} />
        <Route path="/logon/confirmation" exact component={LogonConfirmation} />

        <Route path="/home" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}