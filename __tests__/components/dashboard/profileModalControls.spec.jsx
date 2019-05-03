import React from 'react';
import { shallow } from 'enzyme';
import ProfileModalControls from '../../../src/components/Dashboard/ProfileModalControls';

const setup = () => {
  const props = {
    triggerEdit: jest.fn(),
    triggerDelete: jest.fn(),
  };
  return shallow(<ProfileModalControls {...props} />);
};

describe('ProfileModalControls', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.detail-modal__delete').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
