import * as types from '../actions/types';

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

const records = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.RECORD_REQUEST:
      return { ...state, recordList: [], pending: true, edited: false };

    case types.RECORD_CREATE_SUCCESS:
      return {
        ...state,
        created: true,
        pending: false,
      };

    case types.RECORD_FETCH_SUCCESS:
      return {
        ...state,
        created: false,
        pending: false,
        recordList: payload,
      };

    case types.SINGLE_RECORD_FETCH_SUCCESS: {
      return {
        ...state,
        created: false,
        pending: false,
        record: payload,
      };
    }

    case types.RECORD_FETCH_ERROR:
      return {
        ...state,
        recordList: [],
        created: false,
        pending: false,
        record: {},
      };

    case types.RECORD_CREATE_ERROR:
      return {
        ...state,
        created: false,
        pending: false,
      };

    case types.RECORD_UPDATE_SUCCESS:
      return { ...state, record: {}, edited: true, pending: false };

    case types.RECORD_UPDATE_ERROR:
      return { ...state, pending: false };

    case types.RECORD_DELETE_SUCCESS: {
      return {
        ...state,
        recordList: state.recordList.filter(
          ({ id }) => id !== Number(payload.id)
        ),
        pending: false,
      };
    }

    case types.RECORD_DELETE_ERROR: {
      return { ...state, pending: false };
    }

    case types.STATS_FETCH_SUCCESS: {
      const {
        draft,
        resolved,
        rejected,
        'under investigation': investigating,
      } = payload;

      return {
        ...state,
        stats: {
          Draft: draft || 0,
          Resolved: resolved || 0,
          Rejected: rejected || 0,
          Investigating: investigating || 0,
        },
      };
    }

    case types.STATS_FETCH_ERROR: {
      return {
        ...state,
        stats: {
          Draft: 0,
          Resolved: 0,
          Rejected: 0,
          Investigating: 0,
        },
      };
    }

    default:
      return state;
  }
};

export default records;
