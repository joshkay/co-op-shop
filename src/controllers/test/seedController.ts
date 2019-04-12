import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../entity/User';

class SeedController
{
  async sync(req: Request, res: Response)
  {
    await getConnection().synchronize(true);

    res.status(200).send();
  }

  async user(req: Request, res: Response)
  {
    let { email, password } = req.body;

    let user = new User();
    user.email = email;
    user.password = password;

    user.hashPassword();

    const userRepository = getRepository(User);
    try 
    {
      await userRepository.save(user);
    }
    catch (error)
    {

    }

    res.status(200).send();
  }
}

export default SeedController;