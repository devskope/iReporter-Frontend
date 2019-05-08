/* eslint-disable no-param-reassign */
import { CREATE_TOAST, DELETE_TOAST } from '../actions/types';
import { generateKey } from '../utils/helpers';

const initialState = [];

const toastReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_TOAST:
      return [
        ...state,
        {
          type: payload.type,
          title: payload.title,
          messages: payload.messages,
          visible: true,
          id: generateKey(),
        },
      ];

    case DELETE_TOAST: {
      return state.filter(toast => toast.id !== payload.id);
    }

    default:
      return state;
  }
};

export default toastReducer;
