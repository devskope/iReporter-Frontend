import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AuthFormField from '../../../src/components/Auth/AuthFormField';

const setup = () => {
  const props = {
    field: {
      name: 'name',
      type: 'type',
      value: 'value',
      placeholder: 'placeholder',
      required: true,
    },
    handleInputChange: jest.fn(),
  };
  return shallow(<AuthFormField {...props} />);
};

describe('AuthFormField', () => {
  it('should render self', () => {
    const wrapper = setup();
    const InputProps = wrapper.find('input').props();

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('.form-field').exists()).toBe(true);
    expect(InputProps.value).toBe('value');
    expect(InputProps.placeholder).toBe('placeholder');
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
