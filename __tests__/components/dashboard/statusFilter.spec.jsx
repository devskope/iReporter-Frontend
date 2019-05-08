import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StatusFilter from '../../../src/components/Dashboard/StatusFilter';

describe('StatusFilter', () => {
  const setup = (extraProps = {}) => {
    const props = {
      setStatusFilter: jest.fn(),
      value: 'draft',
      ...extraProps,
    };
    return shallow(<StatusFilter {...props} />);
  };

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
