import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import AuthForm from '../../../src/components/Auth/AuthForm';

const setup = () => {
  const props = {
    authType: 'LOGIN',
    fields: [
      {
        label: 'Username',
        type: 'text',
        name: 'username',
        placeholder: 'Ahmed',
        required: true,
        value: 'abba',
      },
    ],
    handleFormSubmit: jest.fn(),
    handleInputChange: jest.fn(),
    clearErrors: jest.fn(),
    errors: ['error message', 'error message'],
  };
  return mount(
    <Router>
      <AuthForm {...props} />
    </Router>
  );
};

describe('AuthForm', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.auth__message').exists()).toBe(true);
    expect(wrapper.find('.auth__message-list').exists()).toBe(true);
    expect(wrapper.find('.form-fields').exists()).toBe(true);
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('.form-field').exists()).toBe(true);
    expect(wrapper.find('.btn--submit').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
