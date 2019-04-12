/// <reference types="cypress"/>

describe('Page - Join', () =>
{
  beforeEach(() =>
  {
    cy.visit('/join');
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

    it('informs the user if passwords do not match', () =>
    {
      const password = 'password';
      const nonMatchingPassword = 'ahhaa';

      cy.get('[data-cy=password]').children()
        .type(password)
        .should('have.value', password);
        
      cy.get('[data-cy=passwordConfirmation]').children()
        .type(nonMatchingPassword)
        .type('{enter}')
        .should('have.value', nonMatchingPassword);

      cy.get('[data-cy=password]').next()
        .should('contain', 'Passwords must match!');
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

  context('without existing user', () =>
  {
    before(() =>
    {
      cy.request({
        url: '/seed/sync',
        method: 'POST'
      });
    });

    it('should succesfully register a new user', () =>
    {
      cy.get('[data-cy=email]').children()
      .type('user1@test.com');
      
      cy.get('[data-cy=password]').children()
      .type('password');
      cy.get('[data-cy=passwordConfirmation]').children()
      .type('password')
      .type('{enter}');

      cy.location('pathname').should('not.eq', '/join');
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
        this.user = user;
        cy.request({
          url: '/seed/user',
          method: 'POST',
          body: user,
        });
      });
    });

    it('should not register a new user if the email is already taken', () =>
    {
      cy.get('[data-cy=email]').children()
      .type(this.user.email);
      
      cy.get('[data-cy=password]').children()
      .type('password');
      cy.get('[data-cy=passwordConfirmation]').children()
      .type('password')
      .type('{enter}');

      cy.location('pathname').should('eq', '/join');
    });
  });
});