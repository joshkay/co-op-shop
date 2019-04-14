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
        await seedLists(lists);

        getOtherTestUser().then(async (user) =>
        {
          await seedLists(lists, user);

          const res = await getAll();

          expect(lists.length).to.eq(res.data.length);
          res.data.map(list =>
          {
            expect(list).to.deep.include({name: list.name});  
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
});