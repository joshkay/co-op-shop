import * as io from 'socket.io';
import * as http from 'http';
import { verifyAndDecodeJwt } from './auth';

export const createSocketConnection = (server: http.Server): io.Server =>
{
  let socketServer: io.Server = io(server);

  socketServer.use((socket: io.Socket, next) =>
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

  socketServer.on('connection', (socket) =>
  {
    console.log('user connected');

    socket.on('disconnect', () =>
    {
      console.log('user disconnected');
    });
  });

  return socketServer;
}