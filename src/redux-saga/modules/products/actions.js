import {createAction} from 'redux-actions';

export const FETCH_PRODUCTS = 'products/FETCH';
export const SEARCH_PRODUCTS = 'products/SEARCH';
export const FETCH_PRODUCTS_FAILED = 'products/FETCH_FAILED';
export const PRODUCTS_FETCHED = 'products/FETCHED';
export const LOAD_MORE = 'products/LOAD_MORE';
export const MORE_LOADED = 'products/MORE_LOADED';
export const MORE_LOADING_FAILED = 'products/MORE_LOADING_FAILED';
export const productActionCreators = {
  fetchProducts: createAction(FETCH_PRODUCTS),
  searchProduct: createAction(SEARCH_PRODUCTS),
  loadMore: createAction(LOAD_MORE),
};
