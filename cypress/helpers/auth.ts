import { dispatch, getState } from './redux';
import { AppState } from '../../client/src/store';
import { userAuthenticated, userUnauthenticated } from '../../client/src/store/users/actions';

export const getLoginUser = () =>
{
  return cy.fixture('user');
}

export const login = () => 
{
  return getLoginUser().then((user) =>
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
        url: '/user/login',
        method: 'POST',
        body: 
        {
          email: user.email,
          password: user.password,
        }
      })
      .then((res: any) =>
      {
        dispatch(userAuthenticated(res.body, user.email));
      });
    });
  });      
}

export const logout = () =>
{
  dispatch(userUnauthenticated());
}

export const isAuthenticated = (): Cypress.Chainable<boolean> =>
{
  return getState().then((state: AppState) =>
  {
    return state.user.isAuthenticated
  });
}