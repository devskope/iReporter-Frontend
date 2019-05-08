import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditRecord from '../../src/pages/EditRecord';
import { mockStore } from '../../enzyme.config';

describe('EditRecord', () => {
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
          records: { record: { id: 1 }, pending: false, edited: false },
        })}
      >
        <Router>
          <EditRecord match={{ params: { type: 'intervention', id: 2 } }} />
        </Router>
      </Provider>
    );

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
