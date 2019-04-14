/// <reference types="Cypress" />

import { sync } from "../../helpers";
import { seedUser, seedLists } from "../../helpers/seeds";
import { getLoginUser, login, getOtherTestUser } from "../../helpers/auth";
import http from '../../../client/src/requests/http';

describe('API - List', () =>
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

  const add = async (list: {name: string}) =>
  {
    return await http.post(`/list`, list);
  };

  const getOne = async (id: number) =>
  {
    return await http.get(`/list/${id}`);
  }

  const getAll = async () =>
  {
    return await http.get(`/list`);
  };

  describe('POST /list', () =>
  {
    it('should create a new list and return it', async () =>
    {
      const list = 'testlist';

      const res = await add({name: list});
      
      expect(res.data.name).to.eq(list);
    });

    it('should fail with an invalid name', async () =>
    {
      try {
        let res = await add({name: ''});
        assert(false);
      }
      catch (error)
      {
        expect(error.response.status).to.eq(400);
      }
    });
  
    it('should fail with an existing name', async () =>
    {
      const list = 'testlist';

      let res = await <any>add({name: list});
      expect(res.data.name).to.eq(list);

      try {
        res = await <any>add({name: list});
        assert(false);
      }
      catch (error)
      {
        expect(error.response.status).to.eq(409);
      }
    });
  });

  describe('GET /list', () =>
  {
    it('should return lists that belong to user', () =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        let seededLists = await seedLists(lists);

        getOtherTestUser().then(async (user) =>
        {
          await seedLists(lists, user);

          const res = await getAll();

          expect(lists.length).to.eq(res.data.length);
          
          lists = seededLists.data.map(list => ({id: list.id, name: list.name}));

          res.data.map(list =>
          {
            expect(lists).to.deep.include({
              id: list.id,
              name: list.name
            });  
          });
        });
      });
    });

    it('should not return lists that belong to another user', () =>
    {
      cy.fixture('lists')
      .then((lists) =>
      {
        getOtherTestUser().then(async (user) =>
        {
          await seedLists(lists, user);

          const res = await getAll();

          expect(res.data.length).to.eq(0);
        });
      });      
    });
  });

  describe.only('GET /list/:listId', () =>
  {
    it('should return list along with items', () =>
    {
      cy.fixture('lists')
      .then(async (lists) =>
      {
        const seedRes = await seedLists(lists);
        lists = seedRes.data;
      
        const list = lists[0];
        const res = await getOne(list.id);

        expect(list.items.length).to.eq(res.data.items.length);

        expect(res.data.id).to.eq(list.id);
        expect(res.data.name).to.eq(list.name);

        expect(res.data.items.length).to.eq(list.items.length);
        
        const foundItems = res.data.items.map(item => ({
          id: item.id,
          name: item.name,
          purchased: item.purchased
        }))

        foundItems.map(item =>
        {
          expect(list.items).to.deep.include(item);
        });
      });
    });

    it('should not return lists that belong to another user', () =>
    {
      cy.fixture('lists')
      .then((lists) =>
      {
        getOtherTestUser().then(async (user) =>
        {
          const seedRes = await seedLists(lists, user);
          const list = seedRes.data[0];

          try {
            const res = await getOne(list.id);
            assert(false);
          }
          catch(error)
          {
            expect(error.response.status).to.eq(404);
          }
        });
      });      
    });
  });
});