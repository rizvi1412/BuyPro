import {createAction} from 'redux-actions';

export const USER_LOGGED_IN_SUCCESSFUL = 'auth/LOGIN_SUCCESSFUL';
export const AUTHENTICATE = 'auth/AUTHENTICATE';
export const AUTHENTICATION_FAILED = 'auth/AUTHENTICATION_FAILED';
export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const LOGOUT = 'auth/LOGOUT';
export const authActionCreators = {
  performLogin: createAction(AUTHENTICATE),
  logout: createAction(LOGOUT),
};
