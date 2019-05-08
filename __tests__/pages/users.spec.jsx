import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockStore } from '../../enzyme.config';
import Users from '../../src/pages/Users';

describe('Users', () => {
  const setup = () =>
    mount(
      <Provider
        store={mockStore({
          records: {
            record: { id: 1 },
            recordList: [],
            pending: false,
            edited: false,
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
          <Users />
        </Router>
      </Provider>
    );

  it('should match snapshot', async () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
