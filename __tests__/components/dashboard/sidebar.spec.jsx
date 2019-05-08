import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecordStatWidget from '../../../src/components/Dashboard/RecordStatWidget';
import Sidebar from '../../../src/components/Dashboard/Sidebar';

const setup = (extraProps = {}) => {
  const props = {
    statWidgets: [<RecordStatWidget key={1} title="draft" count={20} />],
    ...extraProps,
  };
  return shallow(<Sidebar {...props} />);
};

describe('Sidebar', () => {
  it('should render full sidebar', () => {
    const wrapper = setup();
    expect(wrapper.find('.dashboard__sidebar').exists()).toBe(true);
    expect(wrapper.find('.dashboard__sidebar-toggle').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
