/// <reference types="cypress"/>

import { sync } from "../../helpers";
import { login, logout } from '../../helpers/auth';
import { seedUser, seedLists } from "../../helpers/seeds";

describe('Page - Items', () =>
{
  before(() =>
  {
    cy.visit('/');
  });

  describe('unauthenticated user', () =>
  {
    beforeEach(() =>
    {
      logout();
      cy.visit('/lists');
    });
    
    it('should not be accessible when a user is not logged in', () =>
    { 
      cy.location('pathname').should('eq', '/login');
    });
  });

  describe('authenticated user', () =>
  {
    beforeEach(() =>
    {
      sync();
      login();

      cy.fixture('lists')
      .then(async (lists) =>
      {
        const seedRes = await seedLists(lists);
        lists = seedRes.data;

        this.list = lists[0];

        cy.visit(`/list/${this.list.id}`);
      });
    });
    
    it('should show list items', () =>
    { 
      this.list.items.map(item =>
      {
        cy.get('main').should('contain', item.name);
      });
    });
  });
});