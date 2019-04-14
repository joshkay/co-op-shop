import { dispatch, getState } from './redux';
import { AppState } from '../../client/src/store';
import { userAuthenticated, userUnauthenticated } from '../../client/src/store/users/actions';
import { seedUser } from './seeds';
import { getJwt } from '../../src/auth';

export const getLoginUser = () =>
{
  return cy.fixture('users/testUser');
}

export const getOtherTestUser = () =>
{
  return cy.fixture('users/otherTestUser');
}

export const login = () => 
{
  return getLoginUser().then((user) =>
  {
    seedUser(user)
    .then(() =>
    {
      cy.request(
      {
        url: '/api/user/login',
        method: 'POST',
        body: 
        {
          email: user.email,
          password: user.password,
        }
      })
      .then((res: any) =>
      {
        const token = getJwt(res);
        dispatch(userAuthenticated(token, user.email));
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