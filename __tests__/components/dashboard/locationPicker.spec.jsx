import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import LocationPicker from '../../../src/components/Dashboard/LocationPicker';
import { gMapsMock } from '../../../__mocks__/mocks';

const setup = () => {
  const props = {
    location: '45.08882344, 67.96765',
    address: 'valhala',
    handleLocationChange: jest.fn(),
    handleLocationSelect: jest.fn(),
  };
  return mount(<LocationPicker {...props} />);
};

beforeAll(() => {
  global.window.google = gMapsMock;
});

describe('LocationPicker', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('PlacesAutocomplete').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
