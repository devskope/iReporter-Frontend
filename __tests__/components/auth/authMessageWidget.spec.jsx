import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthMessageWidget from '../../../src/components/Auth/AuthMessageWidget';

const setup = () => {
  const props = {
    clearErrors: jest.fn(),
    errors: ['error message', 'error message'],
  };
  return shallow(<AuthMessageWidget {...props} />);
};

describe('AuthMessageWidget', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.auth__message').exists()).toBe(true);
    expect(wrapper.find('.auth__message-list').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
