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
      const res = await http.get(`/list/${list.id}/item`);

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
      const res = await http.post(`/list/${list.id}/item`, {name});

      const item = res.data;

      return dispatch(requestAddItemSuccess(list, item));
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
      const res = await http.patch(`/list/${list.id}/item`, updates);

      const updatedItem = res.data;

      return dispatch(requestUpdateItemSuccess(updatedItem));
    } 
    catch (error) 
    {
      return dispatch(requestUpdateItemFail(item, error));
    }
  }
};

export const requestDeleteItem = (item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM,
    item
  };
};

export const requestDeleteItemSuccess = (item: Item): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM_SUCCESS,
    item
  }
};

export const requestDeleteItemFail = (item: Item, error: string): ItemsActionTypes =>
{
  return {
    type: REQUEST_DELETE_ITEM_FAIL,
    item,
    error
  }
};

export const deleteItem = (list: List, item: Item) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestDeleteItem(item));
    try 
    {
      await http.delete(`/list/${list.id}/item`);

      return dispatch(requestDeleteItemSuccess(item));
    } 
    catch (error) 
    {
      return dispatch(requestDeleteItemFail(item, error));
    }
  }
};
