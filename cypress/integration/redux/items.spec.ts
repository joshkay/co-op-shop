/// <reference types="cypress"/>

import { configureStore } from '../../../client/src/store';
import { List } from '../../../client/src/store/lists/types';
import { Item } from '../../../client/src/store/items/types';
import { 
  receiveItems, 
  requestAddItemSuccess,
  requestDeleteItem,
  requestDeleteItemSuccess,
  requestDeleteItemFail,
  requestUpdateItem,
  requestUpdateItemSuccess,
  requestUpdateItemFail
} from '../../../client/src/store/items/actions';
import { requestAddListSuccess } from '../../../client/src/store/lists/actions';
import {
  userUnauthenticated
} from '../../../client/src/store/users/actions';

describe('Redux - Items', () =>
{
  beforeEach(() =>
  {
    this.store = configureStore();
  });

  context('auth', () =>
  {
    it('should clear the store on logout', () =>
    {
      const list: List = {
        id: 0,
        name: 'redux',
        items: [],
        owned: true
      };
  
      const items: Item[] = 
      [{
        id: 0,
        name: 'action',
        purchased: false
      },
      {
        id: 1,
        name: 'type',
        purchased: true
      },
      {
        id: 2,
        name: 'reducer',
        purchased: false
      }];
  
      this.store.dispatch(receiveItems(list, items));

      expect(Object.keys(this.store.getState().items.items).length).to.eq(items.length);

      this.store.dispatch(userUnauthenticated());

      expect(Object.keys(this.store.getState().items.items).length).to.eq(0);
    });
  });

  context('fetching', () =>
  {
    it('should fetch items into the state, replacing existing items', () =>
    {
      expect(this.store.getState().items.items).to.be.empty;
  
      const list: List = {
        id: 0,
        name: 'redux',
        items: [],
        owned: true
      };
  
      const items: Item[] = 
      [{
        id: 0,
        name: 'action',
        purchased: false
      },
      {
        id: 1,
        name: 'type',
        purchased: true
      },
      {
        id: 2,
        name: 'reducer',
        purchased: false
      }];
  
      this.store.dispatch(receiveItems(list, items));
  
      expect(this.store.getState().items.items[0].item).to.include(items[0]);
      expect(this.store.getState().items.items[1].item).to.include(items[1]);
      expect(this.store.getState().items.items[2].item).to.include(items[2]);
  
      const anotherItem: Item = 
      {
        id: 5,
        name: 'more',
        purchased: true
      };
  
      this.store.dispatch(receiveItems(list, [anotherItem]));
  
      expect(this.store.getState().items.items).not.to.have.keys('0', '1', '2');
      expect(this.store.getState().items.items[5].item).to.include(anotherItem);
    });
  });

  context('adding', () =>
  {
    it('should add a new item into the state', () =>
    {
      expect(this.store.getState().items.items).to.be.empty;

      const list: List = {
        id: 0,
        name: 'redux',
        items: [],
        owned: true
      };

      const items: Item[] = 
      [{
        id: 0,
        name: 'action',
        purchased: false
      },
      {
        id: 1,
        name: 'type',
        purchased: true
      }];

      this.store.dispatch(requestAddListSuccess(list));
      expect(this.store.getState().lists.lists[list.id].items).to.be.empty;

      this.store.dispatch(requestAddItemSuccess(list, items[0]));

      expect(this.store.getState().lists.lists[list.id].items).to.deep.eq([items[0].id]);
      expect(this.store.getState().items.items[0].item).to.include(items[0]);

      this.store.dispatch(requestAddItemSuccess(list, items[1]));

      expect(this.store.getState().lists.lists[list.id].items).to.deep.eq([items[0].id, items[1].id]);
      expect(this.store.getState().items.items[1].item).to.include(items[1]);
    });
  });

  context('deleting', () =>
  {
    beforeEach(() =>
    {
      this.list = {
        id: 0,
        name: 'redux',
        items: [],
        owned: true
      };
  
      this.items = 
      [{
        id: 0,
        name: 'action',
        purchased: false
      },
      {
        id: 1,
        name: 'type',
        purchased: true
      },
      {
        id: 2,
        name: 'reducer',
        purchased: false
      }];

      this.store.dispatch(receiveItems(this.list, this.items));
    });

    it('should mark an item as deleting', () =>
    {
      expect(this.store.getState().items.items[1].isDeleting).to.be.false;

      this.store.dispatch(requestDeleteItem(this.list, this.items[1]));

      expect(this.store.getState().items.items[1].isDeleting).to.be.true;
    });

    it('should mark an item as no longer deleting and assign an error', () =>
    {
      const error = 'delete failed!';
      this.store.dispatch(requestDeleteItem(this.list, this.items[1]));

      this.store.dispatch(requestDeleteItemFail(this.list, this.items[1], error));

      expect(this.store.getState().items.items[1].isDeleting).to.be.false;
      expect(this.store.getState().items.items[1].error).to.eq(error);
    });

    it('should remove an item from the state', () =>
    {
      const newItem: Item = {
        id: 4,
        name: 'please',
        purchased: false
      };
      const otherNewItem: Item = {
        id: 5,
        name: 'work',
        purchased: true
      };

      this.store.dispatch(receiveItems(this.list, this.items));

      let itemIds = this.items.map(item => item.id);
      expect(this.store.getState().lists.lists[this.list.id].items)
        .to.deep.eq(itemIds);

      this.store.dispatch(requestDeleteItemSuccess(this.list, this.items[1]));

      itemIds = itemIds.filter(id => id != this.items[1].id);
      expect(this.store.getState().lists.lists[this.list.id].items)
        .to.deep.eq(itemIds);

      expect(this.store.getState().items.items).to.have.keys('0', '2');
      expect(this.store.getState().items.items).not.to.have.key('1');

      this.store.dispatch(requestAddItemSuccess(this.list, newItem));
      this.store.dispatch(requestAddItemSuccess(this.list, otherNewItem));

      itemIds.push(newItem.id);
      itemIds.push(otherNewItem.id);

      expect(this.store.getState().lists.lists[this.list.id].items)
        .to.deep.eq(itemIds);
      
      expect(this.store.getState().items.items).to.have.keys('0','2','4','5');
      expect(this.store.getState().items.items).not.to.have.key('1');

      this.store.dispatch(requestDeleteItemSuccess(this.list, otherNewItem));

      itemIds = itemIds.filter(id => id != otherNewItem.id);

      expect(this.store.getState().lists.lists[this.list.id].items)
        .to.deep.eq(itemIds);
    });
  });

  context('updating', () =>
  {
    beforeEach(() =>
    {
      this.list = {
        id: 0,
        name: 'redux',
        items: []
      };
  
      this.items = 
      [{
        id: 0,
        name: 'action',
        purchased: false
      },
      {
        id: 1,
        name: 'type',
        purchased: true
      },
      {
        id: 2,
        name: 'reducer',
        purchased: false
      }];

      this.store.dispatch(receiveItems(this.list, this.items));
    });

    it('should mark an item as updating', () =>
    {
      expect(this.store.getState().items.items[1].isUpdating).to.be.false;

      this.store.dispatch(requestUpdateItem(this.items[1], { name: 'updated' }));

      expect(this.store.getState().items.items[1].isUpdating).to.be.true;
    });

    it('should mark an item as no longer updating and assign an error', () =>
    {
      const error = 'update failed!';
      this.store.dispatch(requestUpdateItem(this.items[1], { name: 'updated' }));

      this.store.dispatch(requestUpdateItemFail(this.items[1], error));

      expect(this.store.getState().items.items[1].isUpdating).to.be.false;
      expect(this.store.getState().items.items[1].error).to.eq(error);
    });

    it('should update an item in the state', () =>
    {
      let updateItemName = 'update';
      let updateItem: Item = {
        id: 3,
        name: updateItemName,
        purchased: false
      };

      this.store.dispatch(receiveItems(this.list, [...this.items, updateItem]));

      updateItem.purchased = true;

      this.store.dispatch(requestUpdateItemSuccess(updateItem));

      expect(this.store.getState().items.items[updateItem.id].item.purchased).to.be.true;
      expect(this.store.getState().items.items[updateItem.id].item.name).to.eq(updateItemName);

      updateItemName = 'updated';
      updateItem.name = updateItemName;

      this.store.dispatch(requestUpdateItemSuccess(updateItem));

      expect(this.store.getState().items.items[updateItem.id].item.purchased).to.be.true;
      expect(this.store.getState().items.items[updateItem.id].item.name).to.eq(updateItemName);
    });
  });
});