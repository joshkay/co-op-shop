/// <reference types="cypress" />

import { login } from '../../helpers/auth';

describe('Page - Login', () =>
{
  beforeEach(() =>
  {
    cy.visit('/login');
  });

  context('input and validation', () =>
  {
    it('focuses email input on load', () =>
    {
      cy.focused().parent()
        .should('have.attr', 'data-cy', 'email');
    });
    
    it('informs the user of an invalid email', () =>
    {
      const typedText = 'test';

      cy.get('[data-cy=email]').children()
        .type(typedText)
        .type('{enter}')
        .should('have.value', typedText);

      cy.get('[data-cy=email]').next()
        .should('contain', 'Not a valid email!');
    });

    it('informs the user of required fields on submit', () =>
    {
      cy.get('[data-cy=email]').children()
        .type('{enter}');

      cy.get('[data-cy=email]').next()
        .should('contain', 'Required');

      cy.get('[data-cy=password]').next()
        .should('contain', 'Required');
    });
  });

  it('login command successfully stores jwt token', () =>
  {
    cy.window().then(window => 
    {
      delete window.localStorage.authToken;
      expect(window.localStorage.authToken).to.be.undefined;

      login()
      .then(() =>
      {
        expect(window.localStorage.authToken).not.to.be.undefined;
      });
    }
   );  
  });

  it('redirects when logged in', () =>
  {
    login()
    .then(() =>
    {
      cy.location('pathname').should('not.eq', '/login');

      cy.visit('/login');
      
      cy.location('pathname').should('not.eq', '/login');
    });
  });

  context('with existing user', () =>
  {
    before(() =>
    {
      cy.request({
        url: '/seed/sync',
        method: 'POST'
      });

      cy.fixture('user').then((user) =>
      {
        cy.request({
          url: '/seed/user',
          method: 'POST',
          body: user,
        });
      });
    });

    it('fails to login an invalid user', () =>
    {
      cy.get('[data-cy=email]').children()
      .type('user@test.com');

      cy.get('[data-cy=password]').children()
        .type('password1')
        .type('{enter}');

      cy.location('pathname').should('eq', '/login');
    });

    it('logs in a valid user', () =>
    {
      cy.get('[data-cy=email]').children()
        .type('user@test.com');

      cy.get('[data-cy=password]').children()
        .type('password')
        .type('{enter}');

      cy.location('pathname').should('eq', '/lists');
    });
  })
});