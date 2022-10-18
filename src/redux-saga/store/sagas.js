import {all, fork} from 'redux-saga/effects';
import {authSaga, productSaga} from '../modules';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(productSaga)]);
}
