import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { List } from '../entity/List';

class ListController
{
  async handleListParam(req: Request, res: Response, next: NextFunction)
  {
    const listId = req.params.listId;

    const listRepository = getRepository(List);
    let list;
    try
    {
      list = await listRepository.findOneOrFail(
        { where: { id: listId } }
      );
    }
    catch (error) 
    {
      res.status(404).send();
      return;
    }

    res.locals.list = list;
    next();
  }

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

    const listData = {
      id: list.id,
      name: list.name
    }
    res.send(listData);
  }

  async getAll(req: Request, res: Response)
  {
    const listRepository = getRepository(List);
    let lists: List[];
    try
    {
      lists = await listRepository.find({
        select: ['id', 'name' ],
        order: { createdAt: 'DESC' },
        relations: ['user']
      });
    }
    catch (error)
    {
      res.status(401).send();
      return;
    }

    const responseLists = (<any>lists).map(list =>
    {
      list.owned = list.user.id == res.locals.user.id;
      delete list.user;

      return list;
    });

    res.send(responseLists);
  }

  async getAllForUser(req: Request, res: Response)
  {
    const listRepository = getRepository(List);
    let lists: List[];
    try
    {
      lists = await listRepository.find({
        select: ['id', 'name'],
        where: { user: res.locals.user },
        order: { createdAt: 'DESC' }
      });
    }
    catch (error)
    {
      res.status(401).send();
      return;
    }

    res.send(lists);
  }

  async getById(req: Request, res: Response)
  {
    const listRepository = getRepository(List);

    const listId = req.params.listId;
    let list: List;

    try
    {
      list = await listRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { id: listId, user: res.locals.user },
        relations: ['items']
      });
    }
    catch (error)
    {
      res.status(404).send();
      return;
    }

    res.send(list);
  }

  async getByIdForUser(req: Request, res: Response)
  {
    const listRepository = getRepository(List);

    const listId = req.params.listId;
    let list: List;

    try
    {
      list = await listRepository.findOneOrFail({
        select: ['id', 'name'],
        where: { id: listId, user: res.locals.user },
        relations: ['items']
      });
    }
    catch (error)
    {
      res.status(404).send();
      return;
    }

    res.send(list);
  }
}

export default ListController;