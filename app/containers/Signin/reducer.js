/*
 *
 * Signin reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './constants';

const initialState = fromJS({
  error: '',
});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      // console.log(action);
      return state.set('error', '');
    case SIGNIN_SUCCESS:
      // console.log(action);
      return state;
    case SIGNIN_ERROR:
      // console.log(action);
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default signinReducer;
