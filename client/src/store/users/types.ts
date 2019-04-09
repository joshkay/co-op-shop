export interface UserState
{
  authenticated: boolean;
  email: string | null;
  error: string | null;
}

export const USER_AUTHENTICATED = 'AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const USER_AUTHENTICATION_ERROR = 'USER_AUTHENTICATION_ERROR';

interface UserAuthenticatedAction
{
  type: typeof USER_AUTHENTICATED;
  token: string;
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

export type UserActionTypes = UserAuthenticatedAction |
  UserUnauthenticatedAction |
  UserAuthenticationErrorAction;