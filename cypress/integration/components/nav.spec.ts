/// <reference types="cypress" />

import { login, logout, getLoginUser, isAuthenticated } from '../../helpers/auth';

describe('Component - Navbar', () =>
{
  beforeEach(() =>
  {
    cy.visit('/');
  });

  context('branding', () =>
  {
    it('should contain Co-Op Shop', () =>
    {
      cy.get('[data-cy=navbar]').should('contain', 'Co-Op Shop');
    });
  
    it('should navigate to the landing page when clicking the site name', () =>
    {
      logout();
      cy.visit('/login');

      cy.get('[data-cy=navBrand]').click();

      cy.location('pathname').should('eq', '/');
    });
  });
  
  context('guest user', () =>
  {
    beforeEach(() =>
    {
      logout();
    });

    it('should contain a link to the sign in page', () =>
    {
      cy.get('[data-cy=navbar]').should('contain', 'Sign In');

      cy.get('[data-cy=navLogin]').click();
      cy.location('pathname').should('eq', '/login');
    });

    it('should contain a link to the join page', () =>
    {
      cy.get('[data-cy=navbar]').should('contain', 'Sign Up');

      cy.get('[data-cy=navJoin]').click();
      cy.location('pathname').should('eq', '/join');
    });

    it('should not contain the user menu', () =>
    {
      cy.get('[data-cy=navUser]').should('not.exist');
    });

    it('should not contain the lists menu', () =>
    {
      cy.get('[data-cy=navbar]').should('not.contain', 'Lists');
      cy.get('[data-cy=navLists]').should('not.exist');
    });
  });

  context('registered user', () =>
  {
    beforeEach(() =>
    {
      login();
    });

    it("should show the user menu with the first letter of the user's email", () =>
    {
      getLoginUser().then((user) =>
      {
        cy.get('[data-cy=navUser]')
        .should('exist')
        .should('contain', user.email[0].toUpperCase());
      });
    });

    it("should show a menu with a logout option when the user menu is clicked", () =>
    {
      cy.get('[data-cy=navUserMenu').should('not.exist');
      cy.get('[data-cy=navUser]').click();

      cy.get('[data-cy=navUserMenu]')
        .should('exist')
        .should('contain', 'Logout');
    });

    it("should logout the user and close the menu when the logout menu item is clicked", () =>
    {
      isAuthenticated().should('be.true');

      cy.get('[data-cy=navUser]').click();

      cy.get('[data-cy=navUserMenuLogout]')
        .click();

      cy.get('[data-cy=navUserMenu').should('not.exist');
      
      isAuthenticated().should('be.false');

      cy.get('[data-cy=navUserMenu]').should('not.exist')
      cy.get('[data-cy=navLogin]').should('exist');
      cy.get('[data-cy=navJoin]').should('exist');
    });

    it('should not contain a link to the sign in page', () =>
    {
      cy.get('[data-cy=navbar]').should('not.contain', 'Sign In');

      cy.get('[data-cy=navLogin]').should('not.exist');
    });

    it('should not contain a link to the join page', () =>
    {
      cy.get('[data-cy=navbar]').should('not.contain', 'Sign Up');

      cy.get('[data-cy=navJoin]').should('not.exist');
    });

    it('should contain a link to the lists page', () =>
    {
      cy.get('[data-cy=navbar]').should('contain', 'Lists');

      cy.get('[data-cy=navLists]').should('exist');
      cy.get('[data-cy=navLists]').click();
      cy.location('pathname').should('eq', '/lists');
    });
  });
});