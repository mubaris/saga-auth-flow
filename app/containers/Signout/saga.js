import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import { SIGNOUT_SUCCESS_GLOBAL } from 'containers/App/constants';

import {
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  URL,
} from './constants';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function* logout() {
  while (true) {
    const request = yield take(SIGNOUT_REQUEST);
    const { history } = request.data;

    yield call(finishLogout, history);
  }
}

function sendRequest() {
  // console.log(username, password, 'test');
  const token = localStorage.getItem('token');
  return fetch(`${URL}`, {
    method: 'POST',
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

function* finishLogout(history) {
  try {
    yield call(sendRequest);
    // console.log(response);
    const signinSuccessResponse = yield put({ type: SIGNOUT_SUCCESS });
    yield put({ type: SIGNOUT_SUCCESS_GLOBAL });
    // console.log('====================================');
    // console.log(signinSuccessResponse);
    // console.log('====================================');
    if (signinSuccessResponse) {
      yield call(forwardTo, history, '/home');
    }
  } catch (e) {
    // console.log(e);
    yield put({ type: SIGNOUT_ERROR });
  }
}

function forwardTo(history, location) {
  history.push(location);
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(logout);
}
