import axios from 'axios';
import { Dispatch } from 'redux';
import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATION_ERROR,
  UserActionTypes
} from './types';

export const userAuthenticated = (token: string) : UserActionTypes =>
{
  return {
    type: USER_AUTHENTICATED,
    token
  }
};

export const userUnauthenticated = () : UserActionTypes =>
{
  return {
    type: USER_UNAUTHENTICATED
  }
};

export const userAuthenticationError = (error: string) : UserActionTypes =>
{
  return {
    type: USER_AUTHENTICATION_ERROR,
    error
  }
};

export const loginUser = (email: string, password: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    try 
    {
      console.log('login request')
      const res = await axios.post(`/login`, { email, password });
      
      console.log('success')
      return dispatch(userAuthenticated(res.data.token));
    } 
    catch(error) 
    {
      console.log('error')
      return dispatch(userAuthenticationError('Invalid email or password!'));
    }
  }
};
