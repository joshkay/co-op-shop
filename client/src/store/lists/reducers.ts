import {
  ListsState,
  ListsActionTypes,
  REQUEST_LISTS,
  RECEIVE_LISTS,
  RECEIVE_LISTS_ERROR,
  REQUEST_ADD_LIST,
  REQUEST_ADD_LIST_FAIL,
  REQUEST_ADD_LIST_SUCCESS
} from './types';

const initialState: ListsState =
{
  isFetching: false,
  isAdding: false,
  lists: [],
  error: null
};

export const listsReducer = (
  state = initialState,
  action: ListsActionTypes
): ListsState =>
{
  switch (action.type)
  {
    case REQUEST_LISTS:
      return { 
        ...state,
        isFetching: true
      };
    case RECEIVE_LISTS:
      return { 
        ...state,
        error: null,
        isFetching: true,
        lists: action.lists
      };
    case RECEIVE_LISTS_ERROR:
      return { 
        ...state,
        isFetching: false,
        error: action.error
      };
    case REQUEST_ADD_LIST:
      return {
        ...state,
        isAdding: true
      };
    case REQUEST_ADD_LIST_SUCCESS:
      return {
        ...state,
        isAdding: false,
        lists: [...state.lists, action.list]
      };
    case REQUEST_ADD_LIST_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.error
      };
    default:
      return state;
  }
}