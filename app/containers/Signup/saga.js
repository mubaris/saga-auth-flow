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
    if (response.key) {
      localStorage.setItem('token', response.key);
      const signinSuccessResponse = yield put({ type: SIGNUP_SUCCESS });
      if (signinSuccessResponse) {
        yield put({ type: SIGNUP_SUCCESS_GLOBAL });
        yield call(forwardTo, history, '/home');
      }
    } else {
      // console.log(response.toString());
      yield put({ type: SIGNUP_ERROR, error: Object.values(response)[0] });
    }
  } catch (e) {
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
