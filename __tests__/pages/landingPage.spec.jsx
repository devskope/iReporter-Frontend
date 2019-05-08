import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import LandingPage from '../../src/pages/LandingPage';
import { mockStore } from '../../enzyme.config';

describe('LandingPage', () => {
  const setup = () =>
    mount(
      <Provider store={mockStore({ auth: { loggedIn: false, user: {} } })}>
        <Router>
          <LandingPage />
        </Router>
      </Provider>
    );

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
