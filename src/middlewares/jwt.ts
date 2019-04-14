import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { createJwt, setJwtHeader, getJwt } from '../auth';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { verifyAndDecodeJwt } from '../auth';

export const updateJwt = async (req: Request, res: Response, next: NextFunction) => 
{
  // Get the JWT token from headers
  const token: string = <string>getJwt(req);
  let jwtPayload = verifyAndDecodeJwt(token);
  
  if (!jwtPayload)
  {
    res.locals.user = null;
    next();
    return;
  }
  
  // We want to send a new token on every request
  // Set its expiration time to that in the .env config
  const { userId, email } = jwtPayload;
  const userRepository = getRepository(User);

  let user: User;
  try
  {
    user = await userRepository.findOneOrFail({
      where: { id: userId, email }
    });
  }
  catch
  {
    res.locals.user = null;
    next();
    return;
  }

  res.locals.user = user;

  const newToken = createJwt(userId, email);
  setJwtHeader(res, newToken);

  next();
};

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => 
{
  if (res.locals.user === null)
  {
    res.status(401).send();
    return;
  }

  next();
}