/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  USERDATA_REQUEST,
  USERDATA_SUCCESS,
  USERDATA_ERROR,
} from './constants';

const initialState = fromJS({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case USERDATA_REQUEST:
      return state;
    case USERDATA_SUCCESS:
      return state.set('username', action.data.username)
        .set('email', action.data.email)
        .set('first_name', action.data.first_name)
        .set('last_name', action.data.last_name);
    case USERDATA_ERROR:
      return state;
    default:
      return state;
  }
}

export default dashboardReducer;
