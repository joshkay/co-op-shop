// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

/// <reference types="Cypress" />

Cypress.Commands.add("login", () => 
{
  return cy.fixture('user').then((user) =>
  {
    cy.request(
    {
      url: '/seed/user',
      method: 'POST',
      body: user,
    })
    .then(() =>
    {
      cy.request(
      {
        url: '/login',
        method: 'POST',
        body: 
        {
          email: user.email,
          password: user.password,
        }
      });
    });
  });      
});

Cypress.Commands.add("logout", () => 
{
  
});

declare namespace Cypress 
{
  export interface Chainable
  {
    login: () => Cypress.Chainable<undefined>
  }
}