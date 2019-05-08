import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../src/App';

const setup = () => mount(<App />);

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
