import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import Landing from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NFC from './pages/NFC';
import ToastContainer from './components/Toast/ToastContainer';
import CreateRecord from './pages/CreateRecord';
import EditRecord from './pages/EditRecord';
import ProtectedRoute from './components/ProtectedRoute';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute
            exact
            path="/records/create"
            component={CreateRecord}
          />
          <ProtectedRoute
            exact
            path="/records/:type/:id/edit"
            component={EditRecord}
          />
          <ProtectedRoute exact path="/users" component={Users} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route component={NFC} />
        </Switch>
      </Router>
      <ToastContainer timeOut={3000} />
    </Provider>
  );
};

export default App;
