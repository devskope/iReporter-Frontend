import * as types from '../types';
import { requireValidateFields } from '../../utils/validator';
import { createToast } from '../toasts';
import {
  awaitFetch,
  fetchErrorHandler,
  fileHandler,
} from '../../utils/helpers';

const createRecord = recordDetails => async dispatch => {
  const { fileErrors, media } = fileHandler(recordDetails.mediaFiles);

  const { validationErrors, validFields } = requireValidateFields([
    'title',
    'comment',
    'type',
  ])(recordDetails);

  if (fileErrors.length)
    dispatch(
      createToast({
        type: 'ERROR',
        title: 'Error uploading files',
        messages: fileErrors,
      })
    );

  if (validationErrors.length)
    dispatch(createToast({ type: 'ERROR', messages: validationErrors }));
  else
    try {
      const recipeRequestData = new FormData();

      Object.entries(validFields).forEach(([key, value]) =>
        recipeRequestData.append(key, value)
      );

      media.forEach(file =>
        file ? recipeRequestData.append('media', file) : null
      );

      const { errors, data } = await awaitFetch(
        `${process.env.API_BASE_URL}/${validFields.type}s`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: true,
          },
          body: recipeRequestData,
        }
      );

      if (errors) {
        dispatch({ type: types.RECORD_CREATE_ERROR });
        dispatch(createToast({ type: 'ERROR', messages: fileErrors }));
      } else {
        dispatch({ type: types.RECORD_CREATE_SUCCESS });
        dispatch(createToast({ messages: [data[0].message] }));
      }
    } catch (error) {
      dispatch({ type: types.RECORD_CREATE_ERROR });
      fetchErrorHandler(error, dispatch);
    }
};

export default createRecord;
