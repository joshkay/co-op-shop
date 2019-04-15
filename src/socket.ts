import * as io from 'socket.io';
import * as http from 'http';
import { verifyAndDecodeJwt } from './auth';
import {
  JOIN_LIST,
  LEAVE_LIST,
  ITEM_EVENT
} from '../client/src/socket/actions';
import {
  ItemsActionTypes
} from '../client/src/store/items/types';

let appSocketServer: io.Server;
let appSocket: io.Socket;

const listRoomName = (listId) => `list/${listId}`;

export const createSocketConnection = (server: http.Server): io.Server =>
{
  appSocketServer = io(server);

  appSocketServer.use((socket: io.Socket, next) =>
  {
    if (socket.handshake.query)
    {
      const token = socket.handshake.query.token;
      let jwtPayload = verifyAndDecodeJwt(token);
  
      if (jwtPayload)
      {
        const { userId, email, exp } = jwtPayload;
        
        const expiresIn = (exp - Date.now() / 1000) * 1000;
        
        console.log(`token expires in: ${expiresIn}`);
        const timeout = setTimeout(() => 
        {
          socket.disconnect();
        }, expiresIn);
      
        socket.on('disconnect', () => clearTimeout(timeout))
      
        return next();
      }
    }

    next(new Error('Authentication error'));
  });

  appSocketServer.on('connection', (socket) =>
  {
    appSocket = socket;
    console.log('user connected');

    socket.on('disconnect', () =>
    {
      console.log('user disconnected');
    });

    socket.on(JOIN_LIST, (listId) =>
    {
      socket.join(listRoomName(listId));
    });

    socket.on(LEAVE_LIST, (listId) =>
    {
      socket.leave(listRoomName(listId));
    });
  });

  return appSocketServer;
}

export const sendItemEvent = (action) =>
{
  appSocketServer.to(listRoomName(action.list.id))
    .emit(ITEM_EVENT, action);
}

export const joinRoom = (name: string) =>
{
  appSocket.join(name);
}

export const leaveRoom = (name: string) =>
{
  appSocket.leave(name);
}

export const getSocket = () =>
{
  return appSocket;
}

export const getSocketServer = () =>
{
  return appSocketServer;
}
