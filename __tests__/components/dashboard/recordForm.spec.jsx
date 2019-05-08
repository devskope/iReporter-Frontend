import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecordForm from '../../../src/components/Dashboard/RecordForm';
import { gMapsMock } from '../../../__mocks__/mocks';

const setup = (extraProps = {}) => {
  const props = {
    fieldValues: {
      title: 'title',
      comment: 'comment',
      type: 'intervention',
      emailnotify: false,
      address: '',
      location: '-9.867,43.878',
    },
    handleFormSubmit: jest.fn(),
    handleCommentChange: jest.fn(),
    handleLocationChange: jest.fn(),
    handleLocationSelect: jest.fn(),
    toggleNotifications: jest.fn(),
    handleTitleChange: jest.fn(),
    handleTypeChange: jest.fn(),
    mediaAttachmentStateChanged: jest.fn(),

    ...extraProps,
  };
  return mount(<RecordForm {...props} />);
};

beforeAll(() => {
  global.window.google = gMapsMock;
});

describe('RecordForm', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.form-fields').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__header').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__title').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__type').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__header').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__header').exists()).toBe(true);
    expect(wrapper.find('.create-edit-form__comment').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
