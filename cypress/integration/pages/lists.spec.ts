/// <reference types="cypress"/>

import { login, logout } from '../../helpers/auth';
import { sync } from '../../helpers';

describe('Page - Lists', () =>
{
  beforeEach(() =>
  {
    
  });

  context('stubbed POST /api/lists', () =>
  {
    beforeEach(() =>
    {
      this.newListName = 'my list';

      cy.visit('/');
      login();
      
      cy.server();
      cy.route({
        method: 'POST',
        url: '/api/list',
        response: {
          id: 0,
          name: this.newListName,
          purchased: false,
          items: []
        }
      });
      cy.route({
        method: 'GET',
        url: '/api/list',
        response: []
      });

      cy.visit('/lists');
    });

    it('should show a new list entry when the new list button is clicked', () =>
    {
      cy.get('[data-cy=userOwnedLists] ul').should('not.exist');

      cy.get('[data-cy=newList]').click();

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1);

      cy.get('[data-cy=listName]').should('exist');
      cy.get('[data-cy=newListSubmit]').should('exist');
    });

    it('should remove the new list entry when the new list item is added', () =>
    {
      cy.get('[data-cy=newList]').click();

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1);

      cy.get('[data-cy=listName] input')
        .type(this.newListName)
        .type('{enter}');

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });

    it('adds a new list by typing enter', () =>
    {
      cy.get('[data-cy=newList]').click();
      cy.get('[data-cy=listName] input')
        .type(this.newListName)
        .type('{enter}');

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });

    it('adds a new list by clicking add button', () =>
    {
      cy.get('[data-cy=newList]').click();
      cy.get('[data-cy=listName] input')
        .type(this.newListName);

      cy.get('[data-cy=newListSubmit]').click();

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });
  });

  context('stubbed GET /api/list', () =>
  {
    beforeEach(() =>
    {
      cy.visit('/');
      login();
      cy.server();
      cy.fixture('lists').then(lists =>
      {
        cy.route({
          method: 'GET',
          url: '/api/list',
          response: lists
        });
      });
      cy.visit('/lists');
    });

    it('loads lists', () =>
    {
      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 3)
        .and('contain', 'list1')
        .and('contain', 'list2')
        .and('contain', 'list3');
    });

    it('visits the specific list page when', () =>
    {
      cy.get('[data-cy=userOwnedLists] ul').children().first().next().click();

      cy.location('pathname').should('eq', '/list/1');
    });
  });

  context('unauthenticated user', () =>
  {
    beforeEach(() =>
    {
      cy.visit('/');
      logout();
      cy.visit('/lists');
    });
    
    it('should not be accessible when a user is not logged in', () =>
    { 
      cy.location('pathname').should('eq', '/login');
    });
  });

  context('authenticated user', () =>
  {
    beforeEach(() =>
    {
      cy.visit('/');
      sync();
      login();
      cy.visit('/lists');
    });
    
    it('should be accessible when a user is logged in', () =>
    {
      cy.location('pathname').should('eq', '/lists');
    });

    it('should show a header for user lists and a button to add new list', () =>
    {
      cy.get('main').should('contain', 'Your Lists');
      cy.get('[data-cy=newList]').should('exist');
    });

    it('should show a header for user lists and a button to add new list', () =>
    {
      cy.get('main').should('contain', 'Your Lists');
      cy.get('[data-cy=newList]').should('exist');
    });

    it('adds a new list by typing enter', () =>
    {
      const testListName = "test list haha";
      
      cy.get('[data-cy=newList]').click();
      cy.get('[data-cy=listName] input')
        .type(testListName)
        .type('{enter}');

      cy.get('[data-cy=userOwnedLists] ul').children()
        .should('have.length', 1)
        .and('contain', testListName);
    });
  });
}); 