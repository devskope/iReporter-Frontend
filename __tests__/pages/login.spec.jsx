import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Login from '../../src/pages/Login';
import { mockStore } from '../../enzyme.config';

describe('Login', () => {
  const setup = () =>
    mount(
      <Provider
        store={mockStore({
          auth: {
            created: false,
            errors: [],
            loggedIn: false,
            pending: false,
            user: { is_admin: false },
            stats: {
              Draft: 0,
              Resolved: 0,
              Rejected: 0,
              Investigating: 0,
            },
          },
        })}
      >
        <Router>
          <Login />
        </Router>
      </Provider>
    );

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
