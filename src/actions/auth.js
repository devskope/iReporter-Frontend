import * as types from './types';
import { awaitFetch, setToken, fetchErrorHandler } from '../utils/helpers';
import { requireValidateFields } from '../utils/validator';
import { createToast } from './toasts';

const authFetchOptions = payload => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

const authResponseHandler = async (response, dispatch, type) => {
  const { errors, data } = response;

  if (errors) {
    dispatch({
      type: types.AUTH_ERROR,
      payload: errors,
    });
  } else {
    const [{ token, user }] = data;

    await setToken(token);
    dispatch({ type, payload: user });

    if (type === types.SIGNED_UP)
      dispatch(
        createToast({
          type: 'SUCCESS',
          messages: [`Hi ${user.username}, welcome to iReporter.`],
        })
      );

    if (type === types.LOGGED_IN)
      dispatch(
        createToast({
          type: 'SUCCESS',
          messages: [`Welcome back ${user.username}.`],
        })
      );
  }
};

export const login = userPayload => async dispatch => {
  dispatch({ type: types.AUTH_INIT });

  const { validationErrors, validFields } = requireValidateFields([
    'username',
    'password',
  ])(userPayload);

  if (validationErrors.length) {
    dispatch({ type: types.AUTH_ERROR, payload: validationErrors });
  } else
    try {
      const response = await awaitFetch(
        process.env.API_LOGIN_URL,
        authFetchOptions(validFields)
      );
      authResponseHandler(response, dispatch, types.LOGGED_IN);
    } catch (error) {
      fetchErrorHandler(error, dispatch);
    }
};

export const signUp = userPayload => async dispatch => {
  dispatch({ type: types.AUTH_INIT });

  const { validationErrors, validFields } = requireValidateFields([
    'email',
    'username',
    'password',
    'firstname',
    'lastname',
  ])(userPayload);

  if (validationErrors.length) {
    dispatch({ type: types.AUTH_ERROR, payload: validationErrors });
  } else
    try {
      const response = await awaitFetch(
        process.env.API_SIGNUP_URL,
        authFetchOptions(validFields)
      );
      authResponseHandler(response, dispatch, types.SIGNED_UP);
    } catch (error) {
      fetchErrorHandler(error, dispatch);
    }
};

export const clearAuthErrors = () => ({ type: types.CLEAR_AUTH_ERRORS });

export const logout = () => dispatch => {
  dispatch({ type: types.LOGOUT });
  dispatch(
    createToast({
      type: 'SUCCESS',
      title: 'Logged out',
      messages: [`You have logged out successfully`],
    })
  );
};
