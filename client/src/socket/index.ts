import * as io from 'socket.io-client';
import {
  requestAddItemSuccess
} from '../store/items/actions';
import {
  REQUEST_ADD_ITEM_SUCCESS,
  ItemsActionTypes
} from '../store/items/types';
import { Store } from 'redux';

export const configureSocket = (store: Store) =>
{
  const socket = io();
  
  // dispatch all item events
  socket.on('item', (payload: any) =>
  {
    store.dispatch(payload);
  });
};
