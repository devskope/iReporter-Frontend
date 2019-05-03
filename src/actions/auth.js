import { AUTH_ERROR, CLEAR_AUTH_ERRORS, LOGGED_IN, SIGNED_UP } from './types';
import {
  awaitFetch,
  setToken,
  fetchErrorHandler,
  getToken,
} from '../utils/helpers';
import { requireValidateFields } from '../utils/validator';
import { createToast } from './toasts';

const authFetchOptions = payload => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: getToken(),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

const authResponseHandler = (response, dispatch, type) => {
  const { errors, data } = response;

  if (errors) {
    dispatch({
      type: AUTH_ERROR,
      payload: errors,
    });
  } else {
    const [{ token, user }] = data;

    dispatch({ type, payload: { user, token } });
    setToken(token);

    if (type === SIGNED_UP)
      dispatch(
        createToast({
          type: 'SUCCESS',
          messages: [`Hi ${user.username}, welcome to iReporter.`],
        })
      );

    if (type === LOGGED_IN)
      dispatch(
        createToast({
          type: 'SUCCESS',
          messages: [`Welcome back ${user.username}.`],
        })
      );
  }
};

export const login = userPayload => async dispatch => {
  const { validationErrors, validFields } = requireValidateFields([
    'username',
    'password',
  ])(userPayload);

  if (validationErrors.length) {
    dispatch({ type: AUTH_ERROR, payload: validationErrors });
  } else
    try {
      const response = await awaitFetch(
        process.env.API_LOGIN_URL,
        authFetchOptions(validFields)
      );
      authResponseHandler(response, dispatch, LOGGED_IN);
    } catch (error) {
      fetchErrorHandler(error, dispatch);
    }
};

export const signUp = userPayload => async dispatch => {
  const { validationErrors, validFields } = requireValidateFields([
    'email',
    'username',
    'password',
    'firstname',
    'lastname',
  ])(userPayload);

  if (validationErrors.length) {
    dispatch({ type: AUTH_ERROR, payload: validationErrors });
  } else
    try {
      const response = await awaitFetch(
        process.env.API_SIGNUP_URL,
        authFetchOptions(validFields)
      );
      authResponseHandler(response, dispatch, SIGNED_UP);
    } catch (error) {
      fetchErrorHandler(error, dispatch);
    }
};

export const clearAuthErrors = () => ({ type: CLEAR_AUTH_ERRORS });
