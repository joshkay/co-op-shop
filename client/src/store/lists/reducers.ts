import {
  ListsState,
  ListsActionTypes,
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
  STOP_VIEWING_LIST
} from './types';
import {
  ItemsActionTypes, 
  REQUEST_DELETE_ITEM_SUCCESS,
  REQUEST_ADD_ITEM_SUCCESS,
  RECEIVE_ITEMS
} from '../items/types';
import { 
  USER_UNAUTHENTICATED,
  UserActionTypes
} from '../users/types';

const initialState: ListsState =
{
  isFetching: false,
  isAdding: false,
  lists: {},
  error: null
};

export const listsReducer = (
  state = initialState,
  action: ListsActionTypes | ItemsActionTypes | UserActionTypes
): ListsState =>
{
  switch (action.type)
  {
    case REQUEST_LISTS:
    case REQUEST_LIST_WITH_ITEMS:
      return { 
        ...state,
        isFetching: true
      };
    case RECEIVE_LISTS:
      const mappedItems = action.lists.reduce((acc: any, list) =>
      {
        list.items = [];
        acc[list.id] = list;
        return acc;
      }, {});

      return { 
        ...state,
        error: null,
        isFetching: false,
        lists: mappedItems
      };
    case RECEIVE_ITEMS:
    case RECEIVE_LIST_WITH_ITEMS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.list.id]: {
            ...action.list,
            items: action.items.map(item => item.id)
          }
        }
      };
    case RECEIVE_LISTS_ERROR:
    case RECEIVE_LIST_WITH_ITEMS_ERROR:
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
        error: null,
        isAdding: false,
        lists: {
          ...state.lists, 
          [action.list.id]: action.list
        }
      };
    case REQUEST_ADD_LIST_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.error
      };
    case REQUEST_ADD_ITEM_SUCCESS:
      let existingList: any = state.lists[action.list.id];
      existingList = existingList ? existingList : {items: []};
      
      return {
        ...state,
        isAdding: false,
        lists: {
          ...state.lists,
          [action.list.id]: 
          {
            ...existingList,
            items: [
              ...existingList.items,
              action.item.id
            ]
          }
        }
      };
    case REQUEST_DELETE_ITEM_SUCCESS:
      const items = state.lists[action.list.id] ? state.lists[action.list.id].items : [];
      const filteredItems = items.filter(itemId =>
      {
        return itemId != action.item.id;
      });

      return {
        ...state,
        isAdding: false,
        lists: {
          ...state.lists,
          [action.list.id]: 
          {
            ...state.lists[action.list.id],
            items: filteredItems
          }
        }
      };
    case USER_UNAUTHENTICATED:
      return {
        ...state,
        lists: {}
      };
    case START_VIEWING_LIST:
      let startViewingList = state.lists[action.list.id];
      if (startViewingList)
      {
        startViewingList.isViewing = true;

        return {
          ...state,
          lists: {
            ...state.lists, 
            [action.list.id]: startViewingList
          }
        }
      }
    case STOP_VIEWING_LIST:
      let stopViewingList = state.lists[action.list.id];
      if (stopViewingList)
      {
        stopViewingList.isViewing = true;

        return {
          ...state,
          lists: {
            ...state.lists, 
            [action.list.id]: stopViewingList
          }
        }
      }
    default:
      return state;
  }
}