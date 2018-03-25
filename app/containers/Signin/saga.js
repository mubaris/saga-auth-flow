import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';

import { SIGNIN_SUCCESS_GLOBAL } from 'containers/App/constants';

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
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

function* login() {
  while (true) {
    const request = yield take(SIGNIN_REQUEST);
    const { username, password, history } = request.data;

    yield call(authorize, { username, password, history });
  }
}

function sendRequest({ username, password }) {
  // console.log(username, password, 'test');
  return fetch(`${URL}login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
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

function* authorize({ username, password, history }) {
  try {
    const response = yield call(sendRequest, { username, password });
    // console.log(response);
    if (response.key) {
      localStorage.setItem('token', response.key);
      const signinSuccessResponse = yield put({ type: SIGNIN_SUCCESS });
      if (signinSuccessResponse) {
        yield put({ type: SIGNIN_SUCCESS_GLOBAL });
        yield call(forwardTo, history, '/home');
      }
    } else {
      // console.log(response.toString());
      yield put({ type: SIGNIN_ERROR, error: Object.values(response)[0] });
    }
    // console.log('====================================');
    // console.log(signinSuccessResponse);
    // console.log('====================================');
  } catch (e) {
    yield put({ type: SIGNIN_ERROR, error: e.message });
  }
}

function forwardTo(history, location) {
  history.push({
    pathname: location,
    state: {
      message: 'Signin Success',
    },
  });
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(login);
}
