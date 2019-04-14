import * as io from 'socket.io';
import * as http from 'http';

export const createSocketConnection = (server: http.Server): io.Server =>
{
  let socketServer: io.Server = io(server);
  socketServer.on('connection', (socket) =>
  {
    //console.log('user connected');

    socket.on('disconnect', () =>
    {
      //console.log('user disconnected');
    });
  });

  return socketServer;
}