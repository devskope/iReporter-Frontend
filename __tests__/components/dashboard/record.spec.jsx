import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Record from '../../../src/components/Dashboard/Record';

const setup = () => {
  const props = {
    record: { title: 'title', comment: 'comment', images: '[]' },
    detailView: jest.fn(),
  };
  return shallow(<Record {...props} />);
};

describe('Record', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.record').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
