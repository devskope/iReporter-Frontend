import * as types from '../types';
import { createToast } from '../toasts';
import {
  awaitFetch,
  buildRecordFetchPath,
  fetchErrorHandler,
  CenterLocation,
} from '../../utils/helpers';
import { reverseGeocode } from '../geocode';

export const fetchRecords = options => async dispatch => {
  const { type, status, userScoped, userID } = options;

  dispatch({ type: types.RECORD_REQUEST });

  const requestUrl = buildRecordFetchPath({
    type,
    status,
    userScoped,
    userID,
  });

  try {
    const { status: resStatus, data, errors } = await awaitFetch(requestUrl);

    if (errors) {
      dispatch({
        type: types.RECORD_FETCH_ERROR,
        payload: errors,
      });
    } else {
      dispatch({
        type: types.RECORD_FETCH_SUCCESS,
        payload: data,
      });
    }

    if (resStatus === 404 || !data.length)
      dispatch(
        createToast({
          type: 'ERROR',
          title: 'No records found',
          messages: data && !data.length ? ['No records created'] : errors,
        })
      );
  } catch (error) {
    fetchErrorHandler(error, dispatch);
  }
};

export const fetchSingleRecord = ({ singleRecordPath }) => async dispatch => {
  dispatch({ type: types.RECORD_REQUEST });

  const requestUrl = buildRecordFetchPath({
    singleRecordPath,
  });

  try {
    const {
      errors,
      data: [record],
    } = await awaitFetch(requestUrl);

    if (errors) {
      dispatch({
        type: types.RECORD_FETCH_ERROR,
        payload: errors,
      });
    } else {
      if (record.location)
        await reverseGeocode(CenterLocation(record.location))(dispatch).then(
          address => {
            Object.assign(record, { address });
          }
        );

      dispatch({
        type: types.SINGLE_RECORD_FETCH_SUCCESS,
        payload: record,
      });
    }
  } catch (error) {
    fetchErrorHandler(error, dispatch);
  }
};

export const fetchDashboardStats = ({
  userScoped = false,
} = {}) => async dispatch => {
  const requestUrl = userScoped
    ? `${process.env.API_BASE_URL}/user/recordstats`
    : `${process.env.API_BASE_URL}/records/stats`;

  dispatch({ type: types.STATS_FETCH });
  try {
    const { status, errors, data } = await awaitFetch(requestUrl);

    if (status === 404 || errors) dispatch({ type: types.STATS_FETCH_ERROR });
    else {
      const [payload] = data;

      if (!userScoped) dispatch({ type: types.STATS_FETCH_SUCCESS, payload });
      else dispatch({ type: types.USER_STATS_FETCH_SUCCESS, payload });
    }
  } catch (error) {
    fetchErrorHandler(error, dispatch);
  }
};
