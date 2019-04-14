import * as io from 'socket.io-client';
import { getToken } from '../auth';
import { store } from '../store';

const socket = io({query: {token: getToken()}});

// dispatch all item events
socket.on('item', (payload: any) =>
{
  store.dispatch(payload);
});

export const disconnectSocket = () =>
{
  socket.disconnect();
}

export const connectSocket = () =>
{
  socket.connect();
}

export default socket;
