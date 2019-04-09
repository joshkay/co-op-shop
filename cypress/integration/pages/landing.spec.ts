/// <reference types="cypress"/>

describe('Page - Landing', () =>
{
  before(() =>
  {
    cy.visit('/');
  });

  it('contains a heading and a background image', () =>
  {
    cy.get('[data-cy=landing-header]').should('exist');
    cy.get('[data-cy=landing-container]')
      .should('have.css', 'background-image');
  });
  
  it('contains feature listings', () =>
  {
    cy.get('[data-cy=landing-features]').children()
      .should('have.length', 3)
      .should('contain', 'Never Forget')
      .should('contain', 'Save Time')
      .should('contain', 'Real-time Updates')
      .each((feature) => {
        cy.wrap(feature).get('svg').should('exist');
        cy.wrap(feature).get('h2').should('exist');
      });
  });
});