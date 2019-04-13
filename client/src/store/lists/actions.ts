import http from '../../requests/http';
import { Dispatch } from 'redux';
import {
  REQUEST_LISTS,
  RECEIVE_LISTS,
  RECEIVE_LISTS_ERROR,
  REQUEST_ADD_LIST,
  REQUEST_ADD_LIST_FAIL,
  REQUEST_ADD_LIST_SUCCESS,
  ListsActionTypes,
  List
} from './types';

export const requestLists = (): ListsActionTypes =>
{
  return {
    type: REQUEST_LISTS
  }
};

export const receiveLists = (lists: List[]): ListsActionTypes =>
{
  return {
    type: RECEIVE_LISTS,
    lists
  }
};

export const receiveListsError = (error: string): ListsActionTypes =>
{
  return {
    type: RECEIVE_LISTS_ERROR,
    error
  }
};

export const fetchLists = () =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestLists());
    try 
    {
      const res = await http.get(`/list`);

      const lists = res.data;

      return dispatch(receiveLists(lists));
    } 
    catch (error) 
    {
      return dispatch(receiveListsError(error));
    }
  }
};

export const requestAddList = (name: string): ListsActionTypes =>
{
  return {
    type: REQUEST_ADD_LIST,
    name
  }
};

export const requestAddListSuccess = (list: List): ListsActionTypes =>
{
  return {
    type: REQUEST_ADD_LIST_SUCCESS,
    list
  }
};


export const requestAddListFail = (error: string): ListsActionTypes =>
{
  return {
    type: REQUEST_ADD_LIST_FAIL,
    error
  }
};

export const addList = (name: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestAddList(name));
    try 
    {
      const res = await http.post(`/list`, {name});

      const list = res.data;

      return dispatch(requestAddListSuccess(list));
    } 
    catch (error) 
    {
      return dispatch(requestAddListFail(error));
    }
  }
};