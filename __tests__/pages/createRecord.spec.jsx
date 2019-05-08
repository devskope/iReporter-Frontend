import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import CreateRecord from '../../src/pages/CreateRecord';
import { mockStore } from '../../enzyme.config';

describe('CreateRecord', () => {
  const setup = () =>
    mount(
      <Provider
        store={mockStore({
          auth: {
            stats: {
              Draft: 0,
              Resolved: 0,
              Rejected: 0,
              Investigating: 0,
            },
          },
          records: { pending: false, created: false },
        })}
      >
        <Router>
          <CreateRecord />
        </Router>
      </Provider>
    );

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
