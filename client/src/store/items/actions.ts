import http from '../../requests/http';
import { Dispatch } from 'redux';
import {
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
  RECEIVE_ITEMS_ERROR,
  REQUEST_ADD_ITEM,
  REQUEST_ADD_ITEM_FAIL,
  REQUEST_ADD_ITEM_SUCCESS,
  REQUEST_DELETE_ITEM,
  REQUEST_DELETE_ITEM_FAIL,
  REQUEST_DELETE_ITEM_SUCCESS,
  REQUEST_UPDATE_ITEM,
  REQUEST_UPDATE_ITEM_FAIL,
  REQUEST_UPDATE_ITEM_SUCCESS,
  ItemsActionTypes,
  Item,
  ItemUpdates
} from './types';
import { List } from '../lists/types';

export const requestItems = (list: List): ItemsActionTypes =>
{
  return {
    type: REQUEST_ITEMS,
    list
  }
};

export const receiveItems = (list: List, items: Item[]): ItemsActionTypes =>
{
  return {
    type: RECEIVE_ITEMS,
    list,
    items
  }
};

export const receiveItemsError = (error: string): ItemsActionTypes =>
{
  return {
    type: RECEIVE_ITEMS_ERROR,
    error
  }
};

export const fetchItems = (list: List) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestItems(list));
    try 
    {
      const res = await http.get(`/api/list/${list.id}/item`);

      const items = res.data;

      return dispatch(receiveItems(list, items));
    } 
    catch (error) 
    {
      return dispatch(receiveItemsError(error));
    }
  }
};

export const requestAddItem = (list: List, name: string): ItemsActionTypes =>
{
  return {
    type: REQUEST_ADD_ITEM,
    list,
    name
  }
};

export const requestAddItemSuccess = (list: List, item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_ADD_ITEM_SUCCESS,
    list,
    item
  }
};

export const requestAddItemFail = (error: string): ItemsActionTypes =>
{
  return {
    type: REQUEST_ADD_ITEM_FAIL,
    error
  }
};

export const addItem = (list: List, name: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestAddItem(list, name));
    try 
    {
      const res = await http.post(`/api/list/${list.id}/item`, {name});

      //const item = res.data;

      //return dispatch(requestAddItemSuccess(list, item));
    } 
    catch (error) 
    {
      return dispatch(requestAddItemFail(error));
    }
  }
};

export const requestUpdateItem = (item: Item, updates: ItemUpdates): ItemsActionTypes =>
{
  return {
    type: REQUEST_UPDATE_ITEM,
    item,
    updates
  };
};

export const requestUpdateItemSuccess = (item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_UPDATE_ITEM_SUCCESS,
    item
  }
};

export const requestUpdateItemFail = (item: Item, error: string): ItemsActionTypes =>
{
  return {
    type: REQUEST_UPDATE_ITEM_FAIL,
    item,
    error
  }
};

export const updateItem = (list: List, item: Item, updates: ItemUpdates) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestUpdateItem(item, updates));
    try 
    {
      const res = await http.patch(`/api/list/${list.id}/item/${item.id}`, updates);

      //const updatedItem = res.data;

      //return dispatch(requestUpdateItemSuccess(updatedItem));
    } 
    catch (error) 
    {
      return dispatch(requestUpdateItemFail(item, error));
    }
  }
};

export const requestDeleteItem = (list: List, item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM,
    list,
    item
  };
};

export const requestDeleteItemSuccess = (list: List, item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM_SUCCESS,
    list,
    item
  }
};

export const requestDeleteItemFail = (list: List, item: Item, error: string): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM_FAIL,
    list,
    item,
    error
  }
};

export const deleteItem = (list: List, item: Item) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestDeleteItem(list, item));
    try 
    {
      await http.delete(`/api/list/${list.id}/item/${item.id}`);

      //return dispatch(requestDeleteItemSuccess(list, item));
    } 
    catch (error) 
    {
      return dispatch(requestDeleteItemFail(list, item, error));
    }
  }
};
