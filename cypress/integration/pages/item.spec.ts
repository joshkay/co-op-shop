/// <reference types="cypress"/>

import { login, logout } from '../../helpers/auth';

describe('Page - Lists', () =>
{
  beforeEach(() =>
  {
    
  });

  context('stubbed POST /lists', () =>
  {
    beforeEach(() =>
    {
      this.newListName = 'my list';

      cy.visit('/');
      login();
      
      cy.server();
      cy.route({
        method: 'POST',
        url: '/list',
        response: {
          name: this.newListName
        }
      });
      cy.route({
        method: 'GET',
        url: '/list',
        response: []
      });

      cy.visit('/lists');
    });

    it('should show a new list entry when the new list button is clicked', () =>
    {
      cy.get('[data-cy=listUsers] ul').should('not.exist');

      cy.get('[data-cy=newList]').click();

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 1);

      cy.get('[data-cy=listName]').should('exist');
      cy.get('[data-cy=newListSubmit]').should('exist');
    });

    it('should remove the new list entry when the new list item is added', () =>
    {
      cy.get('[data-cy=newList]').click();

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 1);

      cy.get('[data-cy=listName] input')
        .type(this.newListName)
        .type('{enter}');

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });

    it('adds a new list by typing enter', () =>
    {
      cy.get('[data-cy=newList]').click();
      cy.get('[data-cy=listName] input')
        .type(this.newListName)
        .type('{enter}');

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });

    it('adds a new list by clicking add button', () =>
    {
      cy.get('[data-cy=newList]').click();
      cy.get('[data-cy=listName] input')
        .type(this.newListName);

      cy.get('[data-cy=newListSubmit]').click();

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 1)
        .and('contain', this.newListName);
    });
  });

  context('stubbed GET /list', () =>
  {
    it('loads lists', () =>
    {
      cy.visit('/');
      login();
      cy.server();
      cy.fixture('lists').then(lists =>
      {
        cy.route({
          method: 'GET',
          url: '/list',
          response: lists
        });
      });
      cy.visit('/lists');

      cy.get('[data-cy=listUsers] ul').children()
        .should('have.length', 3)
        .and('contain', 'list1')
        .and('contain', 'list2')
        .and('contain', 'list3');
    });
  });

  context('no authenticated user', () =>
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
  });
});