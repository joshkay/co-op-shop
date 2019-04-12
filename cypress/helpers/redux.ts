import { AppState } from '../../client/src/store';

export const dispatch = (action: any) =>
{
  cy.window()
    .its<any>('store')
    .invoke('dispatch', action);
}

export const getState = (): Cypress.Chainable<AppState> =>
{
  return cy.window()
    .its<any>('store')
    .invoke('getState');
}