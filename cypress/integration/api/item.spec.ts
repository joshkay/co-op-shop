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
    return await http.post(`/list`, list);
  };

  const addItem = async (listId: number, item: {name: string}) =>
  {
    return await http.post(`/list/${listId}/item`, item);
  };

  const getAll = async (listId: number) =>
  {
    return await http.get(`/list/${listId}/item`);
  };

  describe.only('POST /list/:id/item', () =>
  {
    beforeEach(async () =>
    {
      const list = 'testlist';
      const res = await addList({name: list});
      this.listId = res.data.id;
    });

    it('should add a new item to the list and return it', async () =>
    {
      const item = 'testitem';     

      const res = await addItem(this.listId, {name: item})
      
      expect(res.data.name).to.eq(item);
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

  describe('GET /list/:id/item', () =>
  {
    beforeEach(() =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        this.lists = await seedLists(lists);
      });
    });

    it('should return items that belong to the list', async () =>
    {
      const res = await getAll(this.lists[0].id);

      this.lists[0].items.map((item, index) =>
      {
        expect(item.name).to.eq(res.data.items[index].name);
      });
    });

    it('should return an empty array if no items exist', async () =>
    {
      const list = 'emptylist';
      const addListRes = await addList({name: list});
      const listId = addListRes.data.id;

      const res = await getAll(listId);
      expect(res.data).to.eq([]);
    });
  });
});