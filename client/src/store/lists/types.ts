export interface ListsState
{
  isFetching: boolean;
  isAdding: boolean;
  error: string | null;
  lists: List[];
}

export interface List
{
  id?: number;
  name: string;
  items?: number[];
}

export const REQUEST_LISTS = 'REQUEST_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const RECEIVE_LISTS_ERROR = 'RECEIVE_LISTS_ERROR';

export const REQUEST_ADD_LIST = 'REQUEST_ADD_LIST';
export const REQUEST_ADD_LIST_SUCCESS = 'REQUEST_ADD_LIST_SUCCESS';
export const REQUEST_ADD_LIST_FAIL = 'REQUEST_ADD_LIST_FAIL';

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

export type ListsActionTypes = RequestListsAction |
  ReceiveListsAction |
  ReceiveListsErrorAction |
  RequestAddListAction |
  RequestAddListSuccessAction |
  RequestAddListFailAction;