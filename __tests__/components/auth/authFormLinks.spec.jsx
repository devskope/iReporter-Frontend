import React from 'react';
import { shallow } from 'enzyme';
import AuthFormLinks from '../../../src/components/Auth/AuthFormLinks';

describe('AuthFormLinks', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AuthFormLinks authType="LOGIN" />);

    expect(wrapper.find('.auth__links').exists()).toBe(true);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<AuthFormLinks authType="SIGNUP" />);

    expect(wrapper).toMatchSnapshot();
  });
});
