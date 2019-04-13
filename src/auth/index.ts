import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getJwt as clientGetJwt } from '../../client/src/auth';

export const setJwtHeader = (res: Response, token: string) =>
{
  res.setHeader('authorization', `Bearer ${token}`);
}

export const createJwt = (userId: number, email: string): string =>
{
  return jwt.sign(
    { userId, email },
    process.env.JWTSecret,
    { expiresIn: process.env.JWTExpirationTime }
  );
}

export const getJwt = clientGetJwt;