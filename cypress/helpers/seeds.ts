import http from '../../client/src/requests/http';

export const seedUser = (user) =>
(
  cy.request(
  {
    url: '/api/seed/user',
    method: 'POST',
    body: user,
  })
)

export const seedLists = async (lists: [], user = null) =>
{
  return await http.post('/api/seed/list', {lists, user});
}