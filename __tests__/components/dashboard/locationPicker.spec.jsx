/* eslint-disable class-methods-use-this */
import React from 'react';
import { mount } from 'enzyme';
import LocationPicker from '../../../src/components/Dashboard/LocationPicker';

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
  global.window.google = {
    maps: {
      Marker: class {},
      Map: class {
        setTilt() {}

        fitBounds() {}
      },
      LatLngBounds: class {},
      places: {
        Autocomplete: class {},
        AutocompleteService: class {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
        PlacesAutocomplete: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },

      MarkerClusterer: class {},
      Geocoder: class {},
    },
  };
});

describe('LocationPicker', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('PlacesAutocomplete').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
