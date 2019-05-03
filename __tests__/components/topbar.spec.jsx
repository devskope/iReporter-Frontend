import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Topbar from '../../src/components/Topbar';

describe('Topbar', () => {
  it('should render without crashing', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Topbar links={[{ target: '/', name: 'home' }]} />
      </MemoryRouter>
    );

    expect(wrapper.find('.topbar').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Topbar links={[{ target: '/', name: 'home' }]} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render user widget', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Topbar userWidget />
      </MemoryRouter>
    );

    expect(wrapper.find('.topbar__profile-widget').exists()).toBe(true);
  });
});
