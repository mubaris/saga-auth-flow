import { fromJS } from 'immutable';
import { SIGNIN_SUCCESS_GLOBAL, SIGNOUT_SUCCESS_GLOBAL } from './constants';

const initialState = fromJS({
  isAuthenticated: !!localStorage.getItem('token'),
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS_GLOBAL:
      return state.set('isAuthenticated', true);
    case SIGNOUT_SUCCESS_GLOBAL:
      return state.set('isAuthenticated', false);
    default:
      return state;
  }
}
