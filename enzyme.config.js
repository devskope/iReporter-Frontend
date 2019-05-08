/* eslint-disable */
import '@babel/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import 'dotenv/config';
import 'regenerator-runtime/runtime';
import { gMapsMock } from './__mocks__/mocks';

configure({ adapter: new Adapter() });

global.MutationObserver = class {
  disconnect() {}

  observe() {}

  takeRecords() {
    return [];
  }
};
global.document.getSelection = function() {};

const middleware = [thunk];
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem: jest.fn(),
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});


global.window.google = gMapsMock;
export const mockStore = configureMockStore(middleware);
