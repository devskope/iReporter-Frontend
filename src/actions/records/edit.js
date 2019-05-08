import * as types from '../types';
import {
  buildChangedFields,
  awaitFetch,
  buildRecordFetchPath,
  fetchErrorHandler,
} from '../../utils/helpers';
import { createToast } from '../toasts';

const editRecord = ({
  prevFieldValues,
  editedValues,
  path,
}) => async dispatch => {
  const recordPatch = buildChangedFields(prevFieldValues, editedValues);
  const fieldsChanged = Object.keys(recordPatch);

  if (!fieldsChanged.length) {
    dispatch(
      createToast({
        type: 'ERROR',
        title: 'Error',
        messages: ['Cannot update record without any changes'],
      })
    );
  } else {
    dispatch({ type: types.RECORD_REQUEST });
    try {
      const requestUrl = buildRecordFetchPath({ singleRecordPath: path });

      const fieldUpdateResponses = fieldsChanged.map(field =>
        awaitFetch(`${requestUrl}/${field.toLowerCase()}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            Authorization: true,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: recordPatch[field] }),
        })
      );

      const { errors, messages } = await fieldUpdateResponses.reduce(
        async (res, responsePromise) => {
          const { data, errors: responseErrors } = await responsePromise;
          let message;

          if (data) [{ message }] = data;

          return responseErrors
            ? { ...res, errors: [...res.errors, ...responseErrors] }
            : { ...res, messages: [...res.messages, message] };
        },
        {
          errors: [],
          messages: [],
        }
      );

      if (errors.length) {
        dispatch({ type: types.RECORD_UPDATE_ERROR });
        dispatch(
          createToast({
            type: 'ERROR',
            title: 'Error',
            messages: errors,
          })
        );
      }
      if (messages.length) {
        dispatch({ type: types.RECORD_UPDATE_SUCCESS });
        dispatch(
          createToast({
            type: 'SUCCESS',
            title: 'Update Successful',
            messages,
          })
        );
      }
    } catch (error) {
      fetchErrorHandler(error, dispatch);
      dispatch({ type: types.RECORD_UPDATE_ERROR });
    }
  }
};

export default editRecord;
