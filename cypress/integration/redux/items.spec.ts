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

describe('Redux - Items', () =>
{
  beforeEach(() =>
  {
    this.store = configureStore();
  });

  context('fetching', () =>
  {
    it('should fetch items into the state', () =>
    {
      expect(this.store.getState().items.items).to.be.empty;
  
      const list: List = {
        name: 'redux'
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
  
      expect(this.store.getState().items.items[0].item).to.include(items[0]);
      expect(this.store.getState().items.items[1].item).to.include(items[1]);
      expect(this.store.getState().items.items[2].item).to.include(items[2]);
      expect(this.store.getState().items.items[5].item).to.include(anotherItem);
    });
  });

  context('adding', () =>
  {
    it('should add a new item into the state', () =>
    {
      expect(this.store.getState().items.items).to.be.empty;

      const list: List = {
        name: 'redux'
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

      this.store.dispatch(requestAddItemSuccess(list, items[0]));

      expect(this.store.getState().items.items[0].item).to.include(items[0]);

      this.store.dispatch(requestAddItemSuccess(list, items[1]));

      expect(this.store.getState().items.items[1].item).to.include(items[1]);
    });
  });

  context('deleting', () =>
  {
    beforeEach(() =>
    {
      const list: List = {
        name: 'redux'
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

      this.store.dispatch(receiveItems(list, this.items));
    });

    it('should mark an item as deleting', () =>
    {
      expect(this.store.getState().items.items[1].isDeleting).to.be.false;

      this.store.dispatch(requestDeleteItem(this.items[1]));

      expect(this.store.getState().items.items[1].isDeleting).to.be.true;
    });

    it('should mark an item as no longer deleting and assign an error', () =>
    {
      const error = 'delete failed!';
      this.store.dispatch(requestDeleteItem(this.items[1]));

      this.store.dispatch(requestDeleteItemFail(this.items[1], error));

      expect(this.store.getState().items.items[1].isDeleting).to.be.false;
      expect(this.store.getState().items.items[1].error).to.eq(error);
    });

    it('should remove an item from the state', () =>
    {
      const list: List = {
        name: 'redux'
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

      this.store.dispatch(requestDeleteItemSuccess(items[1]));

      expect(this.store.getState().items.items).to.have.keys('0', '2');
      expect(this.store.getState().items.items).not.to.have.key('1');
    });
  });

  context('updating', () =>
  {
    beforeEach(() =>
    {
      const list: List = {
        name: 'redux'
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

      this.store.dispatch(receiveItems(list, this.items));
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
      const list: List = {
        name: 'redux'
      };

      let updateItemName = 'reducer';
      let updateItem: Item = {
        id: 2,
        name: updateItemName,
        purchased: false
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
      updateItem];

      this.store.dispatch(receiveItems(list, items));

      updateItem.purchased = true;

      this.store.dispatch(requestUpdateItemSuccess(items[1]));

      expect(this.store.getState().items.items[updateItem.id].item.purchased).to.be.true;
      expect(this.store.getState().items.items[updateItem.id].item.name).to.eq(updateItemName);

      updateItemName = 'updated';
      updateItem.name = updateItemName;

      this.store.dispatch(requestUpdateItemSuccess(items[1]));

      expect(this.store.getState().items.items[updateItem.id].item.purchased).to.be.true;
      expect(this.store.getState().items.items[updateItem.id].item.name).to.eq(updateItemName);
    });
  });
});