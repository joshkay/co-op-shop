import * as io from 'socket.io-client';
import { getToken } from '../auth';
import { store } from '../store';
import { userUnauthenticated } from '../store/users/actions';

export const initializeSocket = () =>
{
  let socket = io({query: {token: getToken()}});
  
    // dispatch all item events
  socket.on('item', (payload: any) =>
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

export default socket;
