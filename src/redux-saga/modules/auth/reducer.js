import { AUTHENTICATE, AUTHENTICATED, AUTHENTICATION_FAILED, LOGOUT, USER_LOGGED_IN_SUCCESSFUL } from "./actions";

export const DEFAULT = {
  isLoading: false,
  userData: null,
  authenticated: false,
};

export default function authReducer(state = DEFAULT, action = {}) {
  const { type, payload } = action;
  switch (type) {

    case AUTHENTICATE: {
      return {
        ...state,
        isLoading: true,
        authenticated: false,
      };
    }
    case AUTHENTICATION_FAILED: {
      return {
        ...state,
        isLoading: false,
        authenticated: false,
      };
    }
    case AUTHENTICATED: {
      return {
        ...state,
        isLoading: false,
        userData: payload,
        authenticated: true,
      };
    }
    case USER_LOGGED_IN_SUCCESSFUL: {
      return {
        ...state,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        userData: null,
      };
    }
    default: {
      return state;
    }
  }
}
