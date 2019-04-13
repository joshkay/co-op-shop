import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { createJwt, setJwtHeader } from '../auth';

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
      user = await userRepository.save(user);
    }
    catch (error)
    {
      res.status(409).send();
      return;
    }

    setJwtHeader(res, createJwt(user.id, user.email));

    res.status(200).send();
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
    
    setJwtHeader(res, createJwt(user.id, user.email));

    res.status(200).send();
  }
}

export default UserController;