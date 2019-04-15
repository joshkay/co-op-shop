import { Item } from '../items/types';

export interface ListsState
{
  isFetching: boolean;
  isAdding: boolean;
  error: string | null;
  lists: {
    [id: number]: List
  }
}

export interface List
{
  isViewing?: boolean;
  owned: boolean;
  id: number;
  name: string;
  items: number[];
}

export const REQUEST_LISTS = 'REQUEST_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LISTS_ERROR = 'RECEIVE_LISTS_ERROR';

export const REQUEST_LIST_WITH_ITEMS = 'REQUEST_LIST_WITH_ITEMS';
export const RECEIVE_LIST_WITH_ITEMS = 'RECEIVE_LIST_WITH_ITEMS';
export const RECEIVE_LIST_WITH_ITEMS_ERROR = 'RECEIVE_LIST_WITH_ITEMS_ERROR';

export const REQUEST_ADD_LIST = 'REQUEST_ADD_LIST';
export const REQUEST_ADD_LIST_SUCCESS = 'REQUEST_ADD_LIST_SUCCESS';
export const REQUEST_ADD_LIST_FAIL = 'REQUEST_ADD_LIST_FAIL';

export const START_VIEWING_LIST = 'START_VIEWING_LIST';
export const STOP_VIEWING_LIST = 'STOP_VIEWING_LIST';

interface RequestListsAction
{
  type: typeof REQUEST_LISTS;
}

interface ReceiveListsAction
{
  type: typeof RECEIVE_LISTS;
  lists: List[];
}

interface ReceiveListsErrorAction
{
  type: typeof RECEIVE_LISTS_ERROR;
  error: string;
}

interface RequestListWithItemsAction
{
  type: typeof REQUEST_LIST_WITH_ITEMS;
  id: number;
}

interface ReceiveListWithItemsAction
{
  type: typeof RECEIVE_LIST_WITH_ITEMS;
  list: List;
  items: Item[];
}

interface ReceiveListWithItemsErrorAction
{
  type: typeof RECEIVE_LIST_WITH_ITEMS_ERROR;
  error: string;
}

interface RequestAddListAction
{
  type: typeof REQUEST_ADD_LIST;
  name: string;
}

interface RequestAddListSuccessAction
{
  type: typeof REQUEST_ADD_LIST_SUCCESS;
  list: List;
}

interface RequestAddListFailAction
{
  type: typeof REQUEST_ADD_LIST_FAIL;
  error: string;
}

interface StartViewingListAction
{
  type: typeof START_VIEWING_LIST,
  list: List
}

interface StopViewingListAction
{
  type: typeof STOP_VIEWING_LIST,
  list: List
}

export type ListsActionTypes = RequestListsAction |
  ReceiveListsAction |
  ReceiveListsErrorAction |
  RequestListWithItemsAction |
  ReceiveListWithItemsAction |
  ReceiveListWithItemsErrorAction |
  RequestAddListAction |
  RequestAddListSuccessAction |
  RequestAddListFailAction |
  StartViewingListAction |
  StopViewingListAction;