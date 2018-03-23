/*
 *
 * Signin actions
 *
 */

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './constants';

export function signinRequest(data) {
  return {
    type: SIGNIN_REQUEST,
    data,
  };
}

export function signinSuccess(token) {
  return {
    type: SIGNIN_SUCCESS,
    token,
  };
}

export function signinError(error) {
  return {
    type: SIGNIN_ERROR,
    error,
  };
}
