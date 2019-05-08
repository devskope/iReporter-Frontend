import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Signup from '../../src/pages/Signup';
import { mockStore } from '../../enzyme.config';
import AuthForm from '../../src/components/Auth/AuthForm';

describe('Signup', () => {
  const setup = (providerProps = {}) =>
    mount(
      <Provider
        store={mockStore({
          auth: {
            created: false,
            errors: [],
            loggedIn: false,
            pending: false,
            user: { is_admin: false },
          },
          ...providerProps,
        })}
      >
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render a redirect on signup', () => {
    const wrapper = setup({
      auth: {
        created: true,
        user: { is_admin: false },
      },
    });

    expect(wrapper.contains(AuthForm)).toBe(false);
  });
});
