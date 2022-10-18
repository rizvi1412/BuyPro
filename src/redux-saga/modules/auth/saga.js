import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { AUTHENTICATE, AUTHENTICATED, AUTHENTICATION_FAILED } from "./actions";
import AuthService from '../../../services/AuthService';

function* authenticationHandler(action) {
  const { username, password, onFailure } = action.payload;

  const response = yield call(AuthService.login, username, password);
  if (response.message) {
    onFailure(response.message);
    yield put({ type: AUTHENTICATION_FAILED });
  } else {
    yield put({ type: AUTHENTICATED, payload: response });
  }
}

function* authenticationTask() {
  yield takeEvery(AUTHENTICATE, authenticationHandler);
}

export default function* authSaga() {
  yield all([fork(authenticationTask)]);
}
