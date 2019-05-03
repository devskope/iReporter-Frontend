import * as types from '../types';
import {
  awaitFetch,
  buildRecordFetchPath,
  getToken,
} from '../../utils/helpers';
import { createToast } from '../toasts';

const deleteRecord = singleRecordPath => async dispatch => {
  const requestUrl = buildRecordFetchPath({
    singleRecordPath,
  });

  dispatch({ type: types.RECORD_REQUEST });

  const { errors, data } = await awaitFetch(requestUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
  });

  if (errors) {
    dispatch({
      type: types.RECORD_DELETE_ERROR,
    });

    dispatch(
      createToast({
        type: 'ERROR',
        title: 'Unable to delete',
        messages: errors,
      })
    );
  } else {
    dispatch({
      type: types.RECORD_DELETE_SUCCESS,
      payload: { id: singleRecordPath.split('/')[1] },
    });

    const [{ message }] = data;

    dispatch(
      createToast({
        type: 'SUCCESS',
        title: 'Deleted',
        messages: [message],
      })
    );
  }
};

export default deleteRecord;
