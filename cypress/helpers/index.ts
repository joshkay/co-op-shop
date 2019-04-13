export const sync = () =>
{
  return cy.request({
    url: '/seed/sync',
    method: 'POST'
  });
}