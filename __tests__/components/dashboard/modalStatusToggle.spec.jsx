import React from 'react';
import { mount } from 'enzyme';
import ModalStatusToggle from '../../../src/components/Dashboard/ModalStatusToggle';

const setup = () => {
  const props = {
    statusChangeHandler: jest.fn(),
  };
  return mount(<ModalStatusToggle {...props} />);
};

describe('ModalStatusToggle', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.detail-modal__toggle-block').exists()).toBe(true);
    expect(wrapper.find('.detail-modal__sub').exists()).toBe(true);
    expect(wrapper.find('.detail-modal__status-toggle').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
