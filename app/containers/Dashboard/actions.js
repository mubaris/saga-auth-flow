/*
 *
 * Dashboard actions
 *
 */

import {
  USERDATA_REQUEST,
  USERDATA_SUCCESS,
  USERDATA_ERROR,
} from './constants';

export function userdataRequest() {
  return {
    type: USERDATA_REQUEST,
  };
}

export function userdataSuccess(data) {
  return {
    type: USERDATA_SUCCESS,
    data,
  };
}

export function userdataError() {
  return {
    type: USERDATA_ERROR,
  };
}
