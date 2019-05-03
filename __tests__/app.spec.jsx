import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';

const setup = () => {
  const props = {};
  return mount(<App {...props} />);
};

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
