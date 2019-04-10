/* eslint-disable no-nested-ternary */
const API_BASEPATH = 'https://ireporter-pms.herokuapp.com/api/v1';

export const API_LOGIN_URL =
  'https://ireporter-pms.herokuapp.com/api/v1/auth/login';

export const API_SIGNUP_URL =
  'https://ireporter-pms.herokuapp.com/api/v1/auth/signup';

export const exists = (...args) =>
  args.every(param => param !== null && typeof param !== 'undefined');

export const nonExistent = (...args) =>
  args.every(param => param === null || typeof param === 'undefined');

export const buildRecordFetchPath = ({
  singleRecordPath,
  status,
  type,
  userScoped,
  userID,
}) =>
  nonExistent(singleRecordPath, status, type, userScoped)
    ? `${API_BASEPATH}/records/`
    : exists(singleRecordPath)
    ? `${API_BASEPATH}/${singleRecordPath}`
    : exists(type, status, userScoped, userID)
    ? `${API_BASEPATH}/user/${userID}/records/${type}/${status}`
    : exists(type, status, userScoped)
    ? `${API_BASEPATH}/user/records/${type}/${status}`
    : exists(type, userScoped, userID)
    ? `${API_BASEPATH}/user/${userID}/records/${type}`
    : exists(type, userScoped)
    ? `${API_BASEPATH}/user/records/${type}`
    : exists(type, status)
    ? `${API_BASEPATH}/records/${type}/${status}`
    : exists(status, userScoped, userID)
    ? `${API_BASEPATH}/user/${userID}/records/${status}`
    : exists(status, userScoped)
    ? `${API_BASEPATH}/user/records/${status}`
    : exists(userScoped, userID)
    ? `${API_BASEPATH}/user/${userID}/records`
    : exists(userScoped)
    ? `${API_BASEPATH}/user/records`
    : exists(status)
    ? `${API_BASEPATH}/records/${status}`
    : exists(type)
    ? `${API_BASEPATH}/${type}s`
    : undefined;

export const getToken = () => localStorage.getItem('iReporter-token');

export const setToken = token =>
  localStorage.setItem('iReporter-token', `Bearer ${token}`);

export const getUsername = () => localStorage.getItem('iReporter-username');

export const setUsername = username =>
  localStorage.setItem('iReporter-username', username);

export const handleInputchange = ({ target: { value } }, updater) => {
  updater(value);
};
