import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAILED,
  LOAD_MORE,
  MORE_LOADED,
  MORE_LOADING_FAILED,
  PRODUCTS_FETCHED,
  SEARCH_PRODUCTS,
} from './actions';

export const DEFAULT = {
  isLoading: false,
  moreLoading: false,
  products: [],
  total: 0,
  skip: 0,
};

export default function productReducer(state = DEFAULT, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case FETCH_PRODUCTS:
    case SEARCH_PRODUCTS: {
      return {
        ...state,
        isLoading: true,
        skip: 0,
      };
    }
    case LOAD_MORE: {
      return {
        ...state,
        moreLoading: true,
      };
    }
    case MORE_LOADING_FAILED: {
      return {
        ...state,
        moreLoading: false,
      };
    }
    case PRODUCTS_FETCHED: {
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        total: payload.total,
        skip: Number(payload.skip),
      };
    }
    case MORE_LOADED: {
      return {
        ...state,
        products: [...state.products, ...payload.products],
        total: payload.total,
        skip: Number(payload.skip),
        moreLoading: false,
      };
    }
    case FETCH_PRODUCTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        products: [],
      };
    }
    default: {
      return state;
    }
  }
}
