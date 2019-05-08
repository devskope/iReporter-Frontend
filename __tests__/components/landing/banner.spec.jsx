import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Banner from '../../../src/components/Landing/Banner';

describe('Banner', () => {
  const setup = () => shallow(<Banner />);

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
