import {
  UserState,
  UserActionTypes,
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATION_ERROR
} from './types';

const initialState: UserState =
{
  authenticated: false,
  email: null,
  error: null
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState =>
{
  switch (action.type)
  {
    case USER_AUTHENTICATED:
      return { 
        ...state,
        error: null,
        authenticated: true
      };
    case USER_UNAUTHENTICATED:
      return { 
        ...state,
        error: null,
        authenticated: false
      };
    case USER_AUTHENTICATION_ERROR:
      return { 
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}