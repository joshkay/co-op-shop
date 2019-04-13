import http from '../../client/src/requests/http';

export const seedUser = (user) =>
(
  cy.request(
  {
    url: '/seed/user',
    method: 'POST',
    body: user,
  })
)

export const seedLists = async (lists: [], user = null) =>
{
  return await http.post('/seed/list', {lists, user});
}