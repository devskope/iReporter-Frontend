import * as types from '../../src/actions/types';
import reducer from '../../src/reducers/authReducer';

const initialState = {
  created: false,
  errors: [],
  loggedIn: false,
  pending: false,
  user: null,
  stats: {
    Draft: 0,
    Resolved: 0,
    Rejected: 0,
    Investigating: 0,
  },
};

const mockName = 'Joe-West';
const initialStateProbe = reducer(undefined, {});

const authInitState = reducer(initialState, { type: types.AUTH_INIT });

const signedUpState = reducer(initialState, {
  type: types.SIGNED_UP,
  payload: { username: mockName },
});

const loggedInState = reducer(initialState, {
  type: types.LOGGED_IN,
  payload: { username: mockName },
});

const authErrorState = reducer(initialState, {
  type: types.AUTH_ERROR,
  payload: ['error occured'],
});

const errorResetState = reducer(initialState, {
  type: types.CLEAR_AUTH_ERRORS,
});

const fetchStatState = reducer(initialState, {
  type: types.USER_STATS_FETCH_SUCCESS,
  payload: {
    draft: 50,
  },
});

const fetchStatError = reducer(
  { ...initialState, stats: { Draft: 20 } },
  {
    type: types.STATS_FETCH_ERROR,
  }
);

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(initialStateProbe).toEqual(initialState);
  });

  it('handle AUTH_INIT', () => {
    expect(authInitState).toEqual({
      ...initialState,
      created: false,
      errors: [],
      loggedIn: false,
      pending: true,
      user: null,
    });
  });

  it('handle SIGNED_UP', () => {
    expect(signedUpState).toEqual({
      ...initialState,
      created: true,
      errors: [],
      loggedIn: true,
      pending: false,
      user: { username: 'Joe-West' },
    });
  });

  it('handle LOGGED_IN', () => {
    expect(loggedInState).toEqual({
      ...initialState,
      created: false,
      errors: [],
      loggedIn: true,
      pending: false,
      user: { username: 'Joe-West' },
    });
  });

  it('handle AUTH_ERROR', () => {
    expect(authErrorState.errors[0]).toEqual('error occured');
  });

  it('handle CLEAR_AUTH_ERRORS', () => {
    expect(errorResetState).toEqual(initialState);
  });

  it('handle USER_STATS_FETCH_SUCCESS', () => {
    expect(fetchStatState.stats.Draft).toEqual(50);
  });

  it('handle USER_STATS_FETCH_ERROR', () => {
    expect(fetchStatError.stats).toEqual({
      Draft: 0,
      Resolved: 0,
      Rejected: 0,
      Investigating: 0,
    });
  });
});
