import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockStore } from '../../../enzyme.config';
import ToastContainer from '../../../src/components/Toast/ToastContainer';

describe('ToastContainer', () => {
  const setup = () => {
    const props = {
      toast: [
        {
          title: 'lklkl',
          messages: ['lklk', 'hggyy'],
          type: 'SUCCESS',
          visible: true,
          id: '87ufttj',
        },
      ],
    };
    return mount(
      <Provider store={mockStore({})}>
        <ToastContainer {...props} />
      </Provider>
    );
  };

  it('should match snapshot', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
