import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Users from './pages/Users';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Admin from './pages/Admin';
import CreateRecord from './pages/CreateRecord';
import EditRecord from './pages/EditRecord';
import NFC from './pages/NFC';
import '../public/css/App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/publicprofile" component={PublicProfile} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/new-record" component={CreateRecord} />
      <Route exact path="/edit-record" component={EditRecord} />
      <Route component={NFC} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('app'));
