export const sync = () =>
{
  return cy.request({
    url: '/api/seed/sync',
    method: 'POST'
  });
}