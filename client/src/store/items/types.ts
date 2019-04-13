import { List } from '../lists/types';

export interface ItemsState
{
  isFetching: boolean;
  isAdding: boolean;
  error: string | null;
  items: {
    [id: number]: ItemState
  }
}

export interface ItemState
{
  item: Item;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
}

export interface Item
{
  id: number;
  name: string;
  purchased: boolean;
}

export interface ItemUpdates
{
  name?: string;
  purchased?: boolean;
}

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const RECEIVE_ITEMS_ERROR = 'RECEIVE_ITEMS_ERROR';

export const REQUEST_ADD_ITEM = 'REQUEST_ADD_ITEM';
export const REQUEST_ADD_ITEM_SUCCESS = 'REQUEST_ADD_ITEM_SUCCESS';
export const REQUEST_ADD_ITEM_FAIL = 'REQUEST_ADD_ITEM_FAIL';

export const REQUEST_UPDATE_ITEM = 'REQUEST_UPDATE_ITEM';
export const REQUEST_UPDATE_ITEM_SUCCESS = 'REQUEST_UPDATE_ITEM_SUCCESS';
export const REQUEST_UPDATE_ITEM_FAIL = 'REQUEST_UPDATE_ITEM_FAIL';

export const REQUEST_DELETE_ITEM = 'REQUEST_DELETE_ITEM';
export const REQUEST_DELETE_ITEM_SUCCESS = 'REQUEST_DELETE_ITEM_SUCCESS';
export const REQUEST_DELETE_ITEM_FAIL = 'REQUEST_DELETE_ITEM_FAIL';

interface RequestItemsAction
{
  type: typeof REQUEST_ITEMS;
  list: List;
}

interface ReceiveItemsAction
{
  type: typeof RECEIVE_ITEMS;
  list: List;
  items: Item[];
}

interface ReceiveItemsErrorAction
{
  type: typeof RECEIVE_ITEMS_ERROR;
  error: string;
}

interface RequestAddItemAction
{
  type: typeof REQUEST_ADD_ITEM;
  list: List;
  name: string;
}

interface RequestAddItemSuccessAction
{
  type: typeof REQUEST_ADD_ITEM_SUCCESS;
  list: List;
  item: Item;
}

interface RequestAddItemFailAction
{
  type: typeof REQUEST_ADD_ITEM_FAIL;
  error: string;
}

interface RequestUpdateItemAction
{
  type: typeof REQUEST_UPDATE_ITEM;
  item: Item;
  updates: ItemUpdates;
}

interface RequestUpdateItemSuccessAction
{
  type: typeof REQUEST_UPDATE_ITEM_SUCCESS;
  item: Item;
}

interface RequestUpdateItemFailAction
{
  type: typeof REQUEST_UPDATE_ITEM_FAIL;
  item: Item;
  error: string;
}

interface RequestDeleteItemAction
{
  type: typeof REQUEST_DELETE_ITEM;
  item: Item;
}

interface RequestDeleteItemSuccessAction
{
  type: typeof REQUEST_DELETE_ITEM_SUCCESS;
  item: Item;
}

interface RequestDeleteItemFailAction
{
  type: typeof REQUEST_DELETE_ITEM_FAIL;
  item: Item;
  error: string;
}

export type ItemsActionTypes = RequestItemsAction |
  ReceiveItemsAction |
  ReceiveItemsErrorAction |
  RequestAddItemAction |
  RequestAddItemSuccessAction |
  RequestAddItemFailAction |
  RequestUpdateItemAction |
  RequestUpdateItemSuccessAction |
  RequestUpdateItemFailAction |
  RequestDeleteItemAction |
  RequestDeleteItemSuccessAction |
  RequestDeleteItemFailAction;