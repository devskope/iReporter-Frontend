import { combineReducers } from 'redux';
import auth from './authReducer';
import records from './recordReducer';
import toast from './toastReducer';

export default combineReducers({
  auth,
  records,
  toast,
});
