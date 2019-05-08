import { CREATE_TOAST, DELETE_TOAST } from './types';

export const createToast = ({
  type = 'SUCCESS',
  messages,
  title = type,
}) => dispatch =>
  dispatch
    ? dispatch({ type: CREATE_TOAST, payload: { type, title, messages } })
    : { type: CREATE_TOAST, payload: { type, title, messages } };
export const deleteToast = id => dispatch =>
  dispatch
    ? dispatch({ type: DELETE_TOAST, payload: { id } })
    : { type: DELETE_TOAST, payload: { id } };
