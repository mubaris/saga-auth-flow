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
    localStorage.setItem('token', response.key);
    const signinSuccessResponse = yield put({ type: SIGNIN_SUCCESS });
    // console.log('====================================');
    // console.log(signinSuccessResponse);
    // console.log('====================================');
    if (signinSuccessResponse) {
      yield call(forwardTo, history, '/home');
    }
  } catch (e) {
    console.log(e);
    yield put({ type: SIGNIN_ERROR, error: e.message });
  }
}

function forwardTo(history, location) {
  history.push(location);
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(login);
}
