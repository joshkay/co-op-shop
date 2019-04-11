export interface UserState
{
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isCreatingAccount: boolean;
  isAuthenticated: boolean;
  email: string | null;
  error: string | null;
}

export const USER_AUTHENTICATED = 'AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const USER_AUTHENTICATION_ERROR = 'USER_AUTHENTICATION_ERROR';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';

interface UserAuthenticatedAction
{
  type: typeof USER_AUTHENTICATED;
  token: string;
  email: string;
}

interface UserUnauthenticatedAction
{
  type: typeof USER_UNAUTHENTICATED;
}

interface UserAuthenticationErrorAction
{
  type: typeof USER_AUTHENTICATION_ERROR;
  error: string;
}

interface UserLoginRequestAction
{
  type: typeof USER_LOGIN_REQUEST;
}

interface UserLogoutRequestAction
{
  type: typeof USER_LOGOUT_REQUEST;
}

interface UserCreateRequestAction
{
  type: typeof USER_CREATE_REQUEST;
}

export type UserActionTypes = UserAuthenticatedAction |
  UserUnauthenticatedAction |
  UserAuthenticationErrorAction |
  UserLoginRequestAction |
  UserLogoutRequestAction |
  UserCreateRequestAction;