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

const initialState = fromJS({});

function signinReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      // console.log(action);
      return state;
    case SIGNIN_SUCCESS:
      // console.log(action);
      return state;
    case SIGNIN_ERROR:
      // console.log(action);
      return state;
    default:
      return state;
  }
}

export default signinReducer;
