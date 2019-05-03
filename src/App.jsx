import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch />
      </Router>
    </Provider>
  );
};

export default App;
