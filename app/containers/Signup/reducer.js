/*
 *
 * Signin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_ERROR,
} from './constants';

const initialState = fromJS({
  error: '',
});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      // console.log(action);
      return state.set('error', '');
    case SIGNUP_SUCCESS:
      // console.log(action);
      return state;
    case SIGNUP_ERROR:
      // console.log(action);
      return state.set('error', action.error);
    case RESET_ERROR:
      return state.set('error', '');
    default:
      return state;
  }
}

export default signinReducer;
