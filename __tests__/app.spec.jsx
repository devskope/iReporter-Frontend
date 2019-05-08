import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockStore } from '../enzyme.config';
import App from '../src/App';

const setup = () =>
  mount(
    <Provider store={mockStore({ auth: { loggedIn: false, user: {} } })}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
