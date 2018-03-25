/*
 *
 * Signout reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
} from './constants';

const initialState = fromJS({});

function signoutReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNOUT_REQUEST:
      return state;
    case SIGNOUT_SUCCESS:
      return state;
    case SIGNOUT_ERROR:
      return state;
    default:
      return state;
  }
}

export default signoutReducer;
