import {
  AUTH_INIT,
  AUTH_ERROR,
  CLEAR_AUTH_ERRORS,
  LOGGED_IN,
  SIGNED_UP,
  USER_STATS_FETCH_SUCCESS,
  STATS_FETCH_ERROR,
  LOGOUT,
} from '../actions/types';

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

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_INIT:
      return {
        ...initialState,
        created: false,
        errors: [],
        loggedIn: false,
        pending: true,
        user: null,
      };

    case LOGGED_IN:
      return {
        ...state,
        created: false,
        errors: [],
        loggedIn: true,
        pending: false,
        user: payload,
      };

    case SIGNED_UP:
      return {
        ...state,
        created: true,
        errors: [],
        loggedIn: true,
        pending: false,
        user: payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        created: false,
        errors: payload,
        loggedIn: false,
        pending: false,
        user: null,
      };

    case CLEAR_AUTH_ERRORS:
      return { ...state, errors: [] };

    case USER_STATS_FETCH_SUCCESS: {
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

    case STATS_FETCH_ERROR: {
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

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default auth;
