import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecordDetailModal from '../../../src/components/Dashboard/RecordDetailModal';

const setup = (extraProps = {}) => {
  const props = {
    record: { title: 'title', comment: 'comment', images: '[]', videos: '[]' },
    profileView: false,
    adminView: false,
    dismissSelf: jest.fn(),
    dispatchRecordDelete: jest.fn(),
    ...extraProps,
  };
  return shallow(<RecordDetailModal {...props} />);
};

describe('RecordDetailModal', () => {
  it('should render without crashing', () => {
    const wrapper = setup();

    expect(wrapper.find('.modal-wrapper').exists()).toBe(true);
  });

  it('should match snapshot', () => {
    const wrapper = setup();

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
