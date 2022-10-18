import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILED,
  LOAD_MORE,
  MORE_LOADED,
  MORE_LOADING_FAILED,
  PRODUCTS_FETCHED,
  SEARCH_PRODUCTS,
} from './actions';
import ProductService from '../../../services/ProductService';

function* productsHandler(action) {
  const {skip} = action.payload;
  try {
    const response = yield call(ProductService.getProducts, skip);
    yield put({type: PRODUCTS_FETCHED, payload: response});
  } catch (e) {
    yield put({type: FETCH_PRODUCTS_FAILED});
  }
}

function* searchHandler(action) {
  const {query} = action.payload;
  try {
    const response = yield call(ProductService.searchProducts, query);
    yield put({type: PRODUCTS_FETCHED, payload: response});
  } catch (e) {
    yield put({type: FETCH_PRODUCTS_FAILED});
  }
}

function* loadMoreHandler() {
  const skip = yield select(state => state.products.skip);

  try {
    const response = yield call(ProductService.getProducts, skip + 10);
    yield put({type: MORE_LOADED, payload: response});
  } catch (e) {
    yield put({type: MORE_LOADING_FAILED});
  }
}

function* productsFetchTask() {
  yield takeLatest(FETCH_PRODUCTS, productsHandler);
}

function* productsSearchTask() {
  yield takeLatest(SEARCH_PRODUCTS, searchHandler);
}

function* productsLazyLoadTask() {
  yield takeLatest(LOAD_MORE, loadMoreHandler);
}

export default function* connectionsSaga(store) {
  yield all([
    fork(productsFetchTask),
    fork(productsSearchTask),
    fork(productsLazyLoadTask),
  ]);
}
