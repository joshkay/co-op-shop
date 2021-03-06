import http from '../../requests/http';
import { Dispatch } from 'redux';
import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATION_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGOUT_REQUEST,
  USER_CREATE_REQUEST,
  UserActionTypes
} from './types';
import { 
  getJwt,
  storeToken, 
  clearToken
} from '../../auth';
import {
  connectSocket, 
  disconnectSocket
} from '../../socket';

export const userAuthenticated = (token: string, email: string): UserActionTypes =>
{
  storeToken(token);
  connectSocket();

  return {
    type: USER_AUTHENTICATED,
    token,
    email
  }
};

export const userUnauthenticated = (): UserActionTypes =>
{
  clearToken();
  disconnectSocket();

  return {
    type: USER_UNAUTHENTICATED
  }
};

export const userAuthenticationError = (error: string): UserActionTypes =>
{
  return {
    type: USER_AUTHENTICATION_ERROR,
    error
  }
};

export const userLoginRequest = (): UserActionTypes =>
{
  return {
    type: USER_LOGIN_REQUEST
  }
};

export const userLogoutRequest = (): UserActionTypes =>
{
  return {
    type: USER_LOGOUT_REQUEST
  }
};

export const userCreateRequest = (): UserActionTypes =>
{
  return {
    type: USER_CREATE_REQUEST
  }
};

export const loginUser = (email: string, password: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(userLoginRequest());
    try 
    {
      const res = await http.post(`/api/user/login`, { email, password });

      const token = <string>getJwt(res);

      return dispatch(userAuthenticated(token, email));
    } 
    catch (error) 
    {
      return dispatch(userAuthenticationError(error));
    }
  }
};

export const logoutUser = () =>
{
  return (dispatch: Dispatch) =>
  {
    dispatch(userLogoutRequest());

    dispatch(userUnauthenticated());
  }
}

export const registerUser = (email: string, password: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(userCreateRequest());
    try 
    {
      const res = await http.post(`/api/user`, { email, password });

      const token = <string>getJwt(res);
      
      return dispatch(userAuthenticated(token, email));
    } 
    catch (error) 
    {
      return dispatch(userAuthenticationError(error));
    }
  }
};
