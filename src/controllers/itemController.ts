import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Item } from '../entity/Item';
import { List } from '../entity/List';

import {
  REQUEST_ADD_ITEM_SUCCESS, REQUEST_DELETE_ITEM_SUCCESS, REQUEST_UPDATE_ITEM_SUCCESS
} from '../../client/src/store/items/types';

class ItemController
{
  async handleItemParam(req: Request, res: Response, next: NextFunction)
  {
    const itemId = req.params.itemId;

    const itemRepository = getRepository(Item);
    let item;
    try
    {
      item = await itemRepository.findOneOrFail(
        { where: { id: itemId } }
      );
    }
    catch (error) 
    {
      res.status(404).send();
      return;
    }

    res.locals.item = item;
    next();
  }

  async create(req: Request, res: Response)
  {
    let { name } = req.body;
    const list = res.locals.list;

    let item = new Item();
    item.name = name;
    item.list = list;
    
    const errors = await validate(item);
    if (errors.length > 0)
    {
      res.status(400).send(errors);
      return;
    }

    const itemRepository = getRepository(Item);
    try
    {
      item = await itemRepository.save(item);
    }
    catch (error)
    {
      res.status(409).send();
      return;
    }

    res.send(item);

    if (res.locals.socketio)
    {
      res.locals.socketio.emit('item', 
        {
          type: REQUEST_ADD_ITEM_SUCCESS,
          list,
          item
        }
      );
    }
  }

  async getAllForList(req: Request, res: Response)
  {
    const itemRepository = getRepository(Item);
    let items: Item[];
    try
    {
      items = await itemRepository.find({
        where: { list: res.locals.list },
        order: { createdAt: 'DESC' }
      });
    }
    catch (error)
    {
      res.status(404).send();
      return;
    }

    res.send(items);
  }

  async delete(req: Request, res: Response)
  {
    const item = {...res.locals.item};
    const list = res.locals.list;
    
    const itemToDelete = res.locals.item;

    const itemRepository = getRepository(Item);
    try
    {
      const result = await itemRepository.remove(itemToDelete);
    }
    catch(error)
    {
      res.status(404).send();
      return;
    }
    
    res.status(200).send();

    if (res.locals.socketio)
    {
      res.locals.socketio.emit('item',
        {
          type: REQUEST_DELETE_ITEM_SUCCESS,
          list,
          item
        }
      );
    }
  }

  async update(req: Request, res: Response)
  {
    let { name, purchased } = req.body;
    const list = res.locals.list;
    let item: Item = res.locals.item;

    item.name = name != undefined ? name : item.name;
    item.purchased = purchased != undefined ? purchased : item.purchased;
    
    const errors = await validate(item);
    if (errors.length > 0)
    {
      res.status(400).send(errors);
      return;
    }

    const itemRepository = getRepository(Item);
    try
    {
      item = await itemRepository.save(item);
    }
    catch (error)
    {
      res.status(409).send();
      return;
    }

    res.send(item);

    if (res.locals.socketio)
    {
      res.locals.socketio.emit('item', 
        {
          type: REQUEST_UPDATE_ITEM_SUCCESS,
          list,
          item
        }
      );
    }
  }
}

export default ItemController;