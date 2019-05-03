import shortid from 'short-id';
import { createToast } from '../actions/toasts';

export const exists = (...args) =>
  args.every(param => param !== null && typeof param !== 'undefined');

export const nonExistent = (...args) =>
  args.every(param => param === null || typeof param === 'undefined');

export const isEmpty = (...args) => args.every(param => param === '');

export const getToken = () => localStorage.getItem('iReporter-token');

export const setToken = token =>
  localStorage.setItem('iReporter-token', `Bearer ${token}`);

export const generateKey = () => shortid.generate();

export const CenterLocation = locationString => {
  const [lng, lat] = locationString.split(',');

  return { lat: JSON.parse(lat), lng: JSON.parse(lng) };
};

export const buildChangedFields = (prevFields, newFields) =>
  Object.keys(newFields).reduce((changed, key) => {
    if (typeof newFields[key] === 'string') {
      newFields[key] = newFields[key].trim();
      if (
        !['location', 'comment'].includes(key) ||
        nonExistent(newFields) ||
        isEmpty(prevFields[key])
      )
        return changed;

      if (prevFields[key] !== newFields[key])
        return { ...changed, [key]: newFields[key] };
    }

    return key === 'emailNotify' && newFields[key] !== prevFields[key]
      ? { ...changed, [key]: newFields[key] }
      : changed;
  }, {});

export const missingFieldsMessage = fields =>
  `Missing ${fields.length > 1 ? fields.slice(0, -1).join(', ') : fields[0]} ${
    fields.length > 1 ? `and ${fields.slice(-1)} fields.` : 'field.'
  }`;

export const fileHandler = fileList =>
  Array.from(fileList).reduce(
    (currentResult, currentFile) => {
      const { name, type } = currentFile;
      const { media, fileErrors } = currentResult;

      if (['image', 'video'].includes(type.split('/')[0])) {
        if (currentFile.size < 25000000) media.push(currentFile);
        else fileErrors.push(`"${name}" is larger than 25mb`);
      } else fileErrors.push(`"${name}" is not a supported file type`);

      return currentResult;
    },
    {
      media: [],
      fileErrors: [],
    }
  );

export const fetchOptions = {
  headers: {
    Accept: 'application/json',
    Authorization: getToken(),
    'Content-Type': 'application/json',
  },
};

export const awaitFetch = async (requestUrl, options = fetchOptions) => {
  try {
    const response = await (await fetch(requestUrl, options)).json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchErrorHandler = (error, dispatch) =>
  error.message === 'Failed to fetch'
    ? dispatch(
        createToast({
          type: 'ERROR',
          messages: [
            `An error occured. Please ensure you're connected to the internet`,
          ],
        })
      )
    : dispatch(
        createToast({
          type: 'ERROR',
          messages: ['An error occured'],
        })
      );

export const getUsernameByID = async creatorID => {
  const requestUrl = `${process.env.API_BASE_URL}/user/id2name/${creatorID}`;

  const {
    data: [{ username }],
    errors,
  } = await (await fetch(requestUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: getToken(),
      'Content-Type': 'application/json',
    },
  })).json();

  if (errors) {
    return undefined;
  }
  return username;
};

/* eslint-disable no-nested-ternary */
export const buildRecordFetchPath = ({
  singleRecordPath,
  status,
  type,
  userScoped,
  userID,
}) => {
  const API_ROOT = process.env.API_BASE_URL;
  return nonExistent(singleRecordPath, status, type, userScoped)
    ? `${API_ROOT}/records/`
    : exists(singleRecordPath)
    ? `${API_ROOT}/${singleRecordPath}`
    : exists(type, status, userScoped, userID)
    ? `${API_ROOT}/user/${userID}/records/${type}/${status}`
    : exists(type, status, userScoped)
    ? `${API_ROOT}/user/records/${type}/${status}`
    : exists(type, userScoped, userID)
    ? `${API_ROOT}/user/${userID}/records/${type}`
    : exists(type, userScoped)
    ? `${API_ROOT}/user/records/${type}`
    : exists(type, status)
    ? `${API_ROOT}/records/${type}/${status}`
    : exists(status, userScoped, userID)
    ? `${API_ROOT}/user/${userID}/records/${status}`
    : exists(status, userScoped)
    ? `${API_ROOT}/user/records/${status}`
    : exists(userID, userScoped)
    ? `${API_ROOT}/user/${userID}/records`
    : exists(userScoped)
    ? `${API_ROOT}/user/records`
    : exists(status)
    ? `${API_ROOT}/records/${status}`
    : exists(type)
    ? `${API_ROOT}/${type}s`
    : undefined;
};
