import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => 
{
  // Get the JWT token from headers
  const token: string = <string>req.headers['auth'];
  let jwtPayload;
  
  // Try to validate the token and get data
  try 
  {
    jwtPayload = <any>jwt.verify(token, process.env.JWTSecret);
    res.locals.jwtPayload = jwtPayload;
  } 
  catch (error) 
  {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // We want to send a new token on every request
  // Set its expiration time to that in the .env config
  const { userId } = jwtPayload;
  const newToken = jwt.sign(
    { userId }, 
    process.env.JWTSecret, 
    { expiresIn: process.env.JWTExpirationTime }
  );
  res.setHeader('token', newToken);

  next();
};