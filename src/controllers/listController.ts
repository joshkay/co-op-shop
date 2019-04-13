import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { List } from '../entity/List';

class ListController
{
  async create(req: Request, res: Response)
  {
    let { name } = req.body;

    let list = new List();
    list.name = name;
    list.user = res.locals.user;
    
    const errors = await validate(list);
    if (errors.length > 0)
    {
      res.status(400).send(errors);
      return;
    }

    const listRepository = getRepository(List);

    try
    {
      list = await listRepository.save(list);
    }
    catch (error)
    {
      res.status(409).send();
      return;
    }

    res.send(list);
  }

  async getAllForUser(req: Request, res: Response)
  {
    const listRepository = getRepository(List);
    let lists: List[];
    try
    {
      lists = await listRepository.find({
        where: { user: res.locals.user },
        order: { createdAt: 'ASC' }
      });
    }
    catch (error)
    {
      res.status(401).send();
      return;
    }

    res.send(lists);
  }
}

export default ListController;