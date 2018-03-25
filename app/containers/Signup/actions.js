/*
 *
 * Signup actions
 *
 */

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  RESET_ERROR,
} from './constants';

export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    data,
  };
}

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error,
  };
}

export function resetError() {
  return {
    type: RESET_ERROR,
  };
}
