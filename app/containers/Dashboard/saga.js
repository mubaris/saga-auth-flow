import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import {
  USERDATA_REQUEST,
  USERDATA_SUCCESS,
  USERDATA_ERROR,
  URL,
} from './constants';

function checkStatus(response) {
  // if (response.status >= 200 && response.status < 300) {
  //   return response;
  // }
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
  return response;
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  // const error = new Error(response.statusText);
  // error.response = response.json();
  // throw error;
  return response.json();
}

function* getUserData() {
  while (true) {
    yield take(USERDATA_REQUEST);

    yield call(passData);
  }
}

function sendRequest() {
  const token = localStorage.getItem('token');
  return fetch(`${URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then(checkStatus).then(parseJSON);
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })
    // .catch((ex) => {
    //   console.log('failed', ex);
    // });
}

function* passData() {
  try {
    const response = yield call(sendRequest);
    // console.log(response);
    if (response.username) {
      yield put({ type: USERDATA_SUCCESS, data: response });
    } else {
      // console.log(response.toString());
      yield put({ type: USERDATA_ERROR });
    }
    // console.log('====================================');
    // console.log(signinSuccessResponse);
    // console.log('====================================');
  } catch (e) {
    yield put({ type: USERDATA_ERROR });
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(getUserData);
}
