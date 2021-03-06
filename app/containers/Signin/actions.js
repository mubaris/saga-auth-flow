/*
 *
 * Signin actions
 *
 */

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  RESET_ERROR,
} from './constants';

export function signinRequest(data) {
  return {
    type: SIGNIN_REQUEST,
    data,
  };
}

export function signinSuccess() {
  return {
    type: SIGNIN_SUCCESS,
  };
}

export function signinError(error) {
  return {
    type: SIGNIN_ERROR,
    error,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
