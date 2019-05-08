import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NFC from '../../src/pages/NFC';

describe('NFC', () => {
  const setup = () => shallow(<NFC />);

  it('should match snapshot', async () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
