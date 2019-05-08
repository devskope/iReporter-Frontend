import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Footer from '../../src/components/Footer';

describe('Footer component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Footer links={[{ target: '/', name: 'home' }]} />
      </MemoryRouter>
    );

    expect(wrapper.find('.footer').exists()).toBe(true);
    expect(wrapper.find('.footer__link').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = mount(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
