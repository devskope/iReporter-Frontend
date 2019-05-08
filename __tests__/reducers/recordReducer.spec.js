import * as types from '../../src/actions/types';
import reducer from '../../src/reducers/recordReducer';

const initialState = {
  created: false,
  pending: false,
  edited: false,
  record: {},
  recordList: [],
  stats: {
    Draft: 0,
    Resolved: 0,
    Rejected: 0,
    Investigating: 0,
  },
};

const record = {
  type: 'red-flag',
  title: 'new red-flag',
  id: 1,
};

const initialStateProbe = reducer(undefined, {});

const initRequestState = reducer(initialState, {
  type: types.RECORD_REQUEST,
});

const createSuccessState = reducer(initialState, {
  type: types.RECORD_CREATE_SUCCESS,
  payload: record,
});

const fetchSuccessState = reducer(initialState, {
  type: types.RECORD_FETCH_SUCCESS,
  payload: [record],
});

const fetchOneSuccessState = reducer(initialState, {
  type: types.SINGLE_RECORD_FETCH_SUCCESS,
  payload: record,
});

const fetchErrorState = reducer(initialState, {
  type: types.RECORD_FETCH_ERROR,
});

const createErrorState = reducer(
  { ...initialState, pending: true },
  {
    type: types.RECORD_CREATE_ERROR,
  }
);

const updateState = reducer(initialState, {
  type: types.RECORD_UPDATE_SUCCESS,
});

const updateErrorState = reducer(initialState, {
  type: types.RECORD_UPDATE_ERROR,
});

const deleteState = reducer(initialState, {
  type: types.RECORD_DELETE_SUCCESS,
  payload: { id: 1 },
});

const deleteErrorState = reducer(initialState, {
  type: types.RECORD_DELETE_ERROR,
});

const fetchStatState = reducer(initialState, {
  type: types.STATS_FETCH_SUCCESS,
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

describe('record reducer', () => {
  it('should return the initial state', () => {
    expect(initialStateProbe).toEqual(initialState);
  });

  it('handle RECORD_REQUEST', () => {
    expect(initRequestState).toEqual({
      ...initialState,
      pending: true,
      edited: false,
    });
  });

  it('handle RECORD_CREATE_SUCCESS', () => {
    expect(createSuccessState).toEqual({
      ...initialState,
      created: true,
      pending: false,
    });
  });

  it('handle RECORD_FETCH_SUCCESS', () => {
    expect(fetchSuccessState).toEqual({
      ...initialState,
      created: false,
      pending: false,
      recordList: [record],
    });
  });

  it('handle SINGLE_RECORD_FETCH_SUCCESS', () => {
    expect(fetchOneSuccessState).toEqual({
      ...initialState,
      created: false,
      pending: false,
      record,
    });
  });

  it('handle RECORD_FETCH_ERROR', () => {
    expect(fetchErrorState).toEqual({
      ...initialState,
      created: false,
      pending: false,
      record: {},
    });
  });

  it('handle RECORD_CREATE_ERROR', () => {
    expect(createErrorState).toEqual({
      ...initialState,
      created: false,
      pending: false,
    });
  });

  it('handle RECORD_UPDATE_SUCCESS', () => {
    expect(updateState).toEqual({
      ...initialState,
      record: {},
      edited: true,
      pending: false,
    });
  });

  it('handle RECORD_UPDATE_ERROR', () => {
    expect(updateErrorState).toEqual({ ...initialState, pending: false });
  });

  it('handle RECORD_DELETE_SUCCESS', () => {
    expect(deleteState).toEqual({
      ...initialState,
      recordList: [],
      pending: false,
    });
  });

  it('handle RECORD_DELETE_ERROR', () => {
    expect(deleteErrorState).toEqual({
      ...initialState,
      pending: false,
    });
  });

  it('handle STATS_FETCH_SUCCESS', () => {
    expect(fetchStatState.stats.Draft).toEqual(50);
  });

  it('handle STATS_FETCH_ERROR', () => {
    expect(fetchStatError.stats).toEqual({
      Draft: 0,
      Resolved: 0,
      Rejected: 0,
      Investigating: 0,
    });
  });
});
