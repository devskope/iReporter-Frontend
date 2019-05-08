import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockStore } from '../../enzyme.config';
import Profile from '../../src/pages/Profile';

describe('Profile', () => {
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
          records: {
            record: { id: 1 },
            recordList: [],
            pending: false,
            edited: false,
          },
        })}
      >
        <Router>
          <Profile />
        </Router>
      </Provider>
    );

  it('should match snapshot', async () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
