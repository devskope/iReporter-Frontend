import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toast from '../../../src/components/Toast/Toast';

describe('Toast', () => {
  const setup = (extraProps = {}) => {
    const props = {
      title: 'hello',
      type: 'SUCCESS',
      messages: ['message 1', 'message 2'],
      timeOut: 2500,
      visible: true,
      ...extraProps,
    };
    return shallow(<Toast {...props} />);
  };

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have error class', () => {
    const wrapper = setup({ type: 'ERROR' });
    expect(wrapper.find('.notification--error').exists()).toBe(true);
  });
});
