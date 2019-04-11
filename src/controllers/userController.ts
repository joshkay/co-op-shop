import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

class UserController
{
  async create(req: Request, res: Response)
  {
    let { email, password } = req.body;

    let user = new User();
    user.email = email;
    user.password = password;
    
    const errors = await validate(user);
    if (errors.length > 0)
    {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);
    try
    {
      await userRepository.save(user);
    }
    catch (error)
    {
      res.status(409).send();
      return;
    }

    res.send(UserController.getJwtToken(user.id, user.email));
  }

  async login(req: Request, res: Response)
  {
    let { email, password } = req.body;

    if (!(email && password))
    {
      res.status(400).send();
      return;
    }

    const userRepository = getRepository(User);
    let user: User;
    try
    {
      user = await userRepository.findOneOrFail({
        where: { email }
      });
    }
    catch (error)
    {
      res.status(401).send();
      return;
    }

    if (!user.checkPassword(password))
    {
      res.status(401).send();
      return;
    }

    res.send(UserController.getJwtToken(user.id, user.email));
  }

  static getJwtToken(userId: number, email: string): string
  {
    return jwt.sign(
      { userId, email },
      process.env.JWTSecret,
      { expiresIn: process.env.JWTExpirationTime }
    );
  }
}

export default UserController;