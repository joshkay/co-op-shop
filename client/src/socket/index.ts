import * as io from 'socket.io-client';
import { getToken } from '../auth';
import { store } from '../store';
import { userUnauthenticated } from '../store/users/actions';
import { ITEM_EVENT, JOIN_LIST, LEAVE_LIST } from './actions';

export const initializeSocket = () =>
{
  let socket = io({query: {token: getToken()}});

    // dispatch all item events
  socket.on(ITEM_EVENT, (payload: any) =>
  {
    store.dispatch(payload);
  });

  socket.on('disconnect', () =>
  {
    store.dispatch(userUnauthenticated());
  });

  return socket;
}
let socket = initializeSocket();

export const disconnectSocket = () =>
{
  socket.disconnect();
}

export const connectSocket = () =>
{
  socket = initializeSocket();
}

export const joinList = (id: number) =>
{
  socket.emit(JOIN_LIST, id);
}

export const leaveList = (id: number) =>
{
  socket.emit(LEAVE_LIST, id);
}


export default socket;
