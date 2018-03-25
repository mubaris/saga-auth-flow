import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import { SIGNUP_SUCCESS_GLOBAL } from 'containers/App/constants';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
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

function* signup() {
  while (true) {
    const request = yield take(SIGNUP_REQUEST);
    const { username, password1, password2, history } = request.data;

    yield call(authorize, { username, password1, password2, history });
  }
}

function sendRequest({ username, password1, password2 }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password1,
      password2,
    }),
  }).then(checkStatus).then(parseJSON);
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log(json);
    // })
    // .catch((ex) => {
    //   console.log('failed', ex);
    // });
}

function* authorize({ username, password1, password2, history }) {
  try {
    const response = yield call(sendRequest, { username, password1, password2 });
    // console.log(response);
    localStorage.setItem('token', response.key);
    const signinSuccessResponse = yield put({ type: SIGNUP_SUCCESS });
    yield put({ type: SIGNUP_SUCCESS_GLOBAL });
    // console.log('====================================');
    // console.log(signinSuccessResponse);
    // console.log('====================================');
    if (signinSuccessResponse) {
      yield call(forwardTo, history, '/home');
    }
  } catch (e) {
    // console.log(e);
    yield put({ type: SIGNUP_ERROR, error: e.message });
  }
}

function forwardTo(history, location) {
  history.push({
    pathname: location,
    state: {
      message: 'Signup Success',
    },
  });
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(signup);
}
