import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecordStatWidget from '../../../src/components/Dashboard/RecordStatWidget';

const setup = () => {
  const props = {
    title: 'draft',
    count: 5,
  };
  return shallow(<RecordStatWidget {...props} />);
};

describe('RecordStatWidget', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.dashboard__stat').exists()).toBe(true);
    expect(wrapper.find('.dashboard__stat-title').exists()).toBe(true);
    expect(wrapper.find('.dashboard__stat-count').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
