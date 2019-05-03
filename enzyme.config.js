/* eslint-disable */
import '@babel/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.MutationObserver = class {
  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }
};
global.document.getSelection = function() {};
