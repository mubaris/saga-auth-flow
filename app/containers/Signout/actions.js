/*
 *
 * Signout actions
 *
 */

import {
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
} from './constants';

export function signoutRequest(data) {
  return {
    type: SIGNOUT_REQUEST,
    data,
  };
}

export function signinSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}

export function signinError(error) {
  return {
    type: SIGNOUT_ERROR,
    error,
  };
}
