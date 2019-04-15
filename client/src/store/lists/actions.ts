import http from '../../requests/http';
import { Dispatch } from 'redux';
import {
  REQUEST_LISTS,
  RECEIVE_LISTS,
  RECEIVE_LISTS_ERROR,
  REQUEST_LIST_WITH_ITEMS,
  RECEIVE_LIST_WITH_ITEMS,
  RECEIVE_LIST_WITH_ITEMS_ERROR,
  REQUEST_ADD_LIST,
  REQUEST_ADD_LIST_FAIL,
  REQUEST_ADD_LIST_SUCCESS,
  START_VIEWING_LIST,
  STOP_VIEWING_LIST,
  ListsActionTypes,
  List
} from './types';
import { Item } from '../items/types';
import {
  joinList, leaveList
} from '../../socket';

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
      const res = await http.get(`/api/list`);

      const lists = res.data;

      return dispatch(receiveLists(lists));
    } 
    catch (error) 
    {
      return dispatch(receiveListsError(error));
    }
  }
};

export const requestListWithItems = (id: number): ListsActionTypes =>
{
  return {
    type: REQUEST_LIST_WITH_ITEMS,
    id
  }
};

export const receiveListWithItems = (list: List, items: Item[]): ListsActionTypes =>
{
  return {
    type: RECEIVE_LIST_WITH_ITEMS,
    list,
    items
  }
};

export const receiveListWithItemsError = (error: string): ListsActionTypes =>
{
  return {
    type: RECEIVE_LIST_WITH_ITEMS_ERROR,
    error
  }
};

export const fetchListWithItems = (id: number) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestListWithItems(id));
    try 
    {
      const res = await http.get(`/api/list/${id}`);

      let list = res.data;
      let items = res.data.items;
      delete list.items;

      return dispatch(receiveListWithItems(list, items));
    } 
    catch (error) 
    {
      return dispatch(receiveListWithItemsError(error));
    }
  }
}

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
      const res = await http.post(`/api/list`, {name});

      let list = res.data;
      list.owned = true;

      return dispatch(requestAddListSuccess(list));
    } 
    catch (error) 
    {
      return dispatch(requestAddListFail(error));
    }
  }
};

export const startViewingList = (list: List): ListsActionTypes =>
{
  joinList(list.id);
  return {
    type: START_VIEWING_LIST,
    list
  };
}

export const stopViewingList = (list: List): ListsActionTypes =>
{
  leaveList(list.id);
  return {
    type: STOP_VIEWING_LIST,
    list
  };
}