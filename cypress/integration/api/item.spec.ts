/// <reference types="Cypress" />

import { sync } from "../../helpers";
import { seedUser, seedLists } from "../../helpers/seeds";
import { getLoginUser, login, getOtherTestUser } from "../../helpers/auth";
import http from '../../../client/src/requests/http';

describe('API - Item', () =>
{
  before(() =>
  {
    cy.visit('/');
  });

  beforeEach(() =>
  {
    sync();
    login();
  });

  const addList = async (list: {name: string}) =>
  {
    return await http.post(`/api/list`, list);
  };

  const addItem = async (listId: number, item: {name: string}) =>
  {
    return await http.post(`/api/list/${listId}/item`, item);
  };

  const getAll = async (listId: number) =>
  {
    return await http.get(`/api/list/${listId}/item`);
  };

  const deleteItem = async (listId: number, itemId: number) =>
  {
    return await http.delete(`/api/list/${listId}/item/${itemId}`);
  };

  const editItem = async (listId: number, itemId: number, item: {name?: string, purchased?: boolean}) =>
  {
    return await http.patch(`/api/list/${listId}/item/${itemId}`, item);
  };

  describe('POST /api/list/:id/item', () =>
  {
    beforeEach(async () =>
    {
      const list = 'testlist';
      const res = await addList({name: list});
      this.listId = res.data.id;
    });

    it('should add a new item to the list and return it', async () =>
    {
      const itemsBeforeAdd = await getAll(this.listId);
      const item = 'testitem';     

      const res = await addItem(this.listId, {name: item});
      
      const itemsAfterAdd = await getAll(this.listId);
      
      expect(itemsAfterAdd.data.length).to.eq(itemsBeforeAdd.data.length + 1);
      
      const foundItem = itemsAfterAdd.data.reduce((checkItem) =>
      (
        checkItem.id == res.data.id
      ));

      expect(foundItem.name).to.eq(item);
      expect(res.data.name).to.eq(item);
    });

    it('should create an item that is not purchased', async () =>
    {
      const item = 'testitem';     

      const res = await addItem(this.listId, {name: item})
      
      expect(res.data.purchased).to.eq(false);
    });

    it('should fail with an invalid name', async () =>
    {
      try 
      {
        let res = await addItem(this.listId, {name: ''});
        assert(false);
      }
      catch (error)
      {
        expect(error.response.status).to.eq(400);
      }
    });
  
    it('should fail with an existing name', async () =>
    {
      const item = 'testitem dupe';

      let res = await addItem(this.listId, {name: item});
      expect(res.data.name).to.eq(item);

      try {
        res = await addItem(this.listId, {name: item});
        assert(false);
      }
      catch (error)
      {
        expect(error.response.status).to.eq(409);
      }
    });
  });

  describe('GET /api/list/:listId/item', () =>
  {
    beforeEach(() =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        const res = await seedLists(lists);
        this.lists = res.data;
      });
    });

    it('should return items that belong to the list', async () =>
    {
      const res = await getAll(this.lists[0].id);
      const items = this.lists[0].items;

      expect(items.length).to.eq(res.data.length);
      res.data.map(item =>
      {
        expect(items).to.deep.include({
          id: item.id, 
          name: item.name,
          purchased: item.purchased
        });  
      });
    });

    it('should return an empty array if no items exist', async () =>
    {
      const list = 'emptylist';
      const addListRes = await addList({name: list});
      const listId = addListRes.data.id;

      const res = await getAll(listId);
      expect(res.data.length).to.eq(0);
    });
  });

  describe('DELETE /api/list/:listId/item/:itemId', () =>
  {
    beforeEach(() =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        const res = await seedLists(lists);
        this.lists = res.data;
      });
    });

    it('should delete an item', async () =>
    {
      const list = this.lists[0];

      const itemsBeforeDelete = await getAll(list.id);
      const itemToDelete = list.items[0];   

      const res = await deleteItem(list.id, itemToDelete.id);
      
      const itemsAfterDelete = await getAll(list.id);
      
      expect(itemsAfterDelete.data.length).to.eq(itemsBeforeDelete.data.length - 1);
      
      const foundItem = itemsAfterDelete.data.reduce((checkItem) =>
      (
        checkItem.id == res.data.id
      ));

      expect(foundItem.name).to.eq(undefined);
      expect(res.status).to.eq(200);
    });

    it('should respond with an error if the item id is invalid and not change items', async () =>
    {
      const list = this.lists[0];
      const itemId = 1000;
      
      const itemsBeforeDelete = await getAll(list.id);
      
      try 
      {
        const res = await deleteItem(list.id, itemId);
        assert(false);
      }
      catch(error)
      {
        expect(error.response.status).to.eq(404);
      }

      const itemsAfterDelete = await getAll(list.id);

      expect(itemsBeforeDelete.data).to.deep.equal(itemsAfterDelete.data);
    });
  });

  describe('PATCH /api/list/:listId/item/:itemId', () =>
  {
    beforeEach(() =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        const res = await seedLists(lists);
        this.lists = res.data;
      });
    });

    it('should update an item name', async () =>
    {
      const list = this.lists[0];
      const itemToUpdate = list.items[2]; 
      const updatedName = 'newlyupdated';

      const res = await editItem(list.id, itemToUpdate.id, {name: updatedName});

      expect(res.data.name).to.eq(updatedName);
      expect(res.status).to.eq(200);

      const updatedItems = await getAll(list.id);

      const updatedItem = updatedItems.data.filter((item) => 
      (
        item.id === itemToUpdate.id
      ))[0];

      expect(updatedItem.name).to.eq(updatedName);
    });

    it('should update whether or not an item was purchased', async () =>
    {
      const list = this.lists[0];
      const itemToUpdate = list.items[2];
      expect(itemToUpdate.purchased).to.eq(false);

      const res = await editItem(list.id, itemToUpdate.id, {purchased: true});

      expect(res.data.purchased).to.eq(true);
      expect(res.status).to.eq(200);

      const updatedItems = await getAll(list.id);

      const updatedItem = updatedItems.data.filter((item) => 
      (
        item.id === itemToUpdate.id
      ))[0];

      expect(updatedItem.purchased).to.eq(true);
    });

    it('should respond with an error if the item id is invalid and not change items', async () =>
    {
      const list = this.lists[0];
      const itemId = 1000;
      
      const itemsBeforeEdit = await getAll(list.id);
      
      try 
      {
        await editItem(list.id, itemId, {name: 'should fail'});
        assert(false);
      }
      catch(error)
      {
        expect(error.response.status).to.eq(404);
      }

      const itemsAfterEdit = await getAll(list.id);

      expect(itemsBeforeEdit.data).to.deep.equal(itemsAfterEdit.data);
    });
  });
});