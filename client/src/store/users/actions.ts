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
import { storeToken } from '../../auth';

export const userAuthenticated = (token: string, email: string): UserActionTypes =>
{
  return {
    type: USER_AUTHENTICATED,
    token,
    email
  }
};

export const userUnauthenticated = (): UserActionTypes =>
{
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
      const res = await http.post(`/user/login`, { email, password });

      const token = res.data;
      storeToken(token);

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

    delete localStorage.authToken;

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
      const res = await http.post(`/user`, { email, password });

      const token = res.data;
      storeToken(token);
      
      return dispatch(userAuthenticated(token, email));
    } 
    catch (error) 
    {
      return dispatch(userAuthenticationError(error));
    }
  }
};
