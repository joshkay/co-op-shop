import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Item } from '../entity/Item';
import { List } from '../entity/List';

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

    let item = new Item();
    item.name = name;
    item.list = res.locals.list;
    
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
    const itemRepository = getRepository(Item);
    try
    {
      console.log(res.locals.item);
      const result = await itemRepository.remove(res.locals.item);
      console.log(result);
    }
    catch(error)
    {
      res.status(404).send();
      return;
    }
    
    res.status(200).send();
  }

  async update(req: Request, res: Response)
  {
    let { name, purchased } = req.body;
    let item: Item = res.locals.item;

    item.name = name ? name : item.name;
    item.purchased = purchased ? purchased : item.purchased;
    
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
  }
}

export default ItemController;