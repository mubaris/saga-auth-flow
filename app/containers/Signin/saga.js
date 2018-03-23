import { call, put, take, fork } from 'redux-saga/effects';
import 'whatwg-fetch';
import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
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

function* login() {
  while (true) {
    const request = yield take(SIGNIN_REQUEST);
    const { username, password } = request.data;

    yield call(authorize, { username, password });
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

function* authorize(data) {
  try {
    const response = yield call(sendRequest, data);
    // console.log(response);
    yield put({ type: SIGNIN_SUCCESS, token: response.key });
  } catch (e) {
    yield put({ type: SIGNIN_ERROR, error: e });
  }
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(login);
}
