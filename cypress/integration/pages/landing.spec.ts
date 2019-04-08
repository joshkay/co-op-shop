/// <reference types="cypress"/>

describe('Page - Landing', () =>
{
  before(() =>
  {
    cy.visit('/');
  });

  it('contains Co-Op Shop', () =>
  {
    cy.get('[data-cy=app]').should('have.text', 'Co-Op Shop');
  });
});