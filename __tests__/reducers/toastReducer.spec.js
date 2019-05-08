import * as types from '../../src/actions/types';
import reducer from '../../src/reducers/toastReducer';

const initialState = [];

const toast = {
  type: 'success',
  title: 'toast',
  messages: ['hi'],
  visible: true,
  id: 'tfjK4',
};

const initialStateProbe = reducer(undefined, {});

const createdState = reducer(initialState, {
  type: types.CREATE_TOAST,
  payload: toast,
});

const deletedState = reducer([toast], {
  type: types.DELETE_TOAST,
  payload: { id: 'tfjK4' },
});

describe('toast reducer', () => {
  it('should return the initial state', () => {
    expect(initialStateProbe).toEqual(initialState);
  });

  it('handle CREATE_TOAST', () => {
    expect(createdState).toHaveLength(1);
  });

  it('handle DELETE_TOAST', () => {
    expect(deletedState).toHaveLength(0);
  });
});
