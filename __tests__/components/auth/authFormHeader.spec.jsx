import React from 'react';
import { mount } from 'enzyme';
import AuthFormHeader from '../../../src/components/Auth/AuthFormHeader';

describe('AuthFormHeader', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<AuthFormHeader authType="LOGIN" />);

    expect(wrapper.find('.auth__title').exists()).toBe(true);
    expect(wrapper.find('.main-text').exists()).toBe(true);
    expect(wrapper.find('.sub-text').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = mount(<AuthFormHeader authType="SIGNUP" />);

    expect(wrapper).toMatchSnapshot();
  });
});
