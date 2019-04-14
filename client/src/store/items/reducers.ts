import {
  ItemsActionTypes,
  ItemsState,
  ItemState,
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
  Item
} from './types';
import {
  REQUEST_LIST_WITH_ITEMS,
  RECEIVE_LIST_WITH_ITEMS,
  RECEIVE_LIST_WITH_ITEMS_ERROR,
  ListsActionTypes
} from '../lists/types';
import { 
  USER_UNAUTHENTICATED,
  UserActionTypes
} from '../users/types';

const initialState: ItemsState =
{
  isFetching: false,
  isAdding: false,
  items: {},
  error: null
};

const initialItemState: {
  isDeleting: boolean,
  isUpdating: boolean,
  error: string | null
} = 
{
  isDeleting: false,
  isUpdating: false,
  error: null
};

export const itemsReducer = (
  state = initialState,
  action: ItemsActionTypes | ListsActionTypes | UserActionTypes
): ItemsState =>
{
  switch (action.type)
  {
    case REQUEST_ITEMS:
    case REQUEST_LIST_WITH_ITEMS:
      return { 
        ...state,
        isFetching: true
      };
    case RECEIVE_ITEMS:
    case RECEIVE_LIST_WITH_ITEMS:
      const mappedItems = action.items.reduce((accumulator: any, item) =>
      {
        const newItem = itemReducer(initialItemState, action, item);
        return {
          ...accumulator,
          ...newItem
        }
      }, {});

      return {
        ...state,
        error: null,
        isFetching: false,
        items: mappedItems
      };
    case RECEIVE_ITEMS_ERROR:
    case RECEIVE_LIST_WITH_ITEMS_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case REQUEST_ADD_ITEM:
      return {
        ...state,
        isAdding: true
      };
    case REQUEST_ADD_ITEM_FAIL:
      return {
        ...state,
        isAdding: false
      };
    case REQUEST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        isAdding: false,
        items: {
          ...state.items,
          ...itemReducer(state.items[action.item.id], action, action.item)
        }
      };
    case REQUEST_DELETE_ITEM_FAIL:
    case REQUEST_DELETE_ITEM:
    case REQUEST_UPDATE_ITEM_FAIL:
    case REQUEST_UPDATE_ITEM:
    case REQUEST_UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          ...itemReducer(state.items[action.item.id], action, action.item)
        }
      };
    case REQUEST_DELETE_ITEM_SUCCESS:
      let items = state.items;
      delete items[action.item.id];

      return {
        ...state,
        isAdding: false,
        items
      };
    case USER_UNAUTHENTICATED:
      return {
        ...state,
        items: {}
      };
    default:
      return state;
  }
}

const itemReducer = (
  state = initialItemState,
  action: ItemsActionTypes | ListsActionTypes,
  item: Item
): {[id: number]: ItemState} =>
{
  switch (action.type)
  {
    case REQUEST_ADD_ITEM_SUCCESS:
      return {
        [item.id]: {
          ...state,
          item
        }
      };
    case REQUEST_DELETE_ITEM:
      return {
        [item.id]: {
          ...state,
          isDeleting: true,
          item
        }
      };
    case REQUEST_DELETE_ITEM_FAIL:
      return {
        [item.id]: {
          ...state,
          isDeleting: false,
          error: action.error,
          item
        }
      };
    case REQUEST_UPDATE_ITEM:
      return {
        [item.id]: {
          ...state,
          isUpdating: true,
          item
        }
      };
    case REQUEST_UPDATE_ITEM_FAIL:
      return {
        [item.id]: {
          ...state,
          isUpdating: false,
          error: action.error,
          item
        }
      };
    case REQUEST_UPDATE_ITEM_SUCCESS:
      return {
        [item.id]: {
          ...state,
          isUpdating: false,
          error: null,
          item: action.item
        }
      }
    default:
      return {
        [item.id]: {
          ...state,
          item
        }
      };
  }
}