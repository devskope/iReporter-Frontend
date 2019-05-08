import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecordFilters from '../../../src/components/Dashboard/RecordFilters';

const setup = (extraProps = {}) => {
  const props = {
    statusFilter: 'draft',
    setTypeFilter: jest.fn(),
    setStatusFilter: jest.fn(),
    ...extraProps,
  };
  return shallow(<RecordFilters {...props} />);
};

describe('RecordFilters', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.dashboard__filters').exists()).toBe(true);
    expect(wrapper.find('.dashboard__filter-categories').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
