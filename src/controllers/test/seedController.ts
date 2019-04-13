import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { List } from '../../entity/List';

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
    try {
      await userRepository.save(user);
    }
    catch (error) {}

    res.status(200).send();
  }

  async list(req: Request, res: Response)
  {
    const { lists } = req.body;

    let userData = req.body.user;
    let user = null;
    if (userData)
    {
      let user = new User();
      user.email = userData.email;
      user.password = userData.password;

      user.hashPassword();

      const userRepository = getRepository(User);
      try {
        await userRepository.save(user);
      }
      catch (error) {}
    }
    else
    {
      user = res.locals.user;
    }

    await lists.map(async listData =>
    {
      let list = new List();
      list.name = listData.name;
      list.user = user;

      const listRepository = getRepository(List);
      try 
      {
        list = await listRepository.save(list);
      }
      catch (error)
      {
        
      }
    });

    res.status(200).send();
  }
}

export default SeedController;