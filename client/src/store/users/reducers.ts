import {
  UserState,
  UserActionTypes,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATION_ERROR,
  USER_CREATE_REQUEST,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST
} from './types';
import { getTokenEmail } from '../../auth';
import { storeToken, clearToken } from '../../auth';

const email = getTokenEmail();
const initialState: UserState =
{
  isLoggingIn: false,
  isLoggingOut: false,
  isCreatingAccount: false,
  isAuthenticated: email != null,
  email: email,
  error: null
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState =>
{
  switch (action.type)
  {
    case USER_AUTHENTICATED:
      storeToken(action.token);
      return { 
        ...state,
        error: null,
        isLoggingIn: false,
        isLoggingOut: false,
        isCreatingAccount: false,
        isAuthenticated: true,
        email: action.email
      };
    case USER_UNAUTHENTICATED:
      clearToken();
      return { 
        ...state,
        error: null,
        isLoggingIn: false,
        isLoggingOut: false,
        isCreatingAccount: false,
        isAuthenticated: false,
        email: null
      };
    case USER_AUTHENTICATION_ERROR:
      return { 
        ...state,
        isLoggingIn: false,
        isLoggingOut: false,
        isCreatingAccount: false,
        error: action.error
      };
    case USER_CREATE_REQUEST:
      return {
        ...state,
        isCreatingAccount: true
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      };
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true
      };
    default:
      return state;
  }
}