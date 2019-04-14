/// <reference types="Cypress" />

import { sync } from "../../helpers";
import * as jwtDecode from 'jwt-decode';
import { getJwt } from '../../../src/auth';
import { seedUser } from "../../helpers/seeds";
import { getLoginUser } from "../../helpers/auth";

describe('API - Users', () =>
{
  beforeEach(() =>
  {
    sync();
  });

  const add = (user: {email: string, password:string}) =>
  (
    cy.request({
      url: '/api/user',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    })
  );

  const login = (user: {email?: string, password?: string}) =>
  (
    cy.request({
      url: '/api/user/login',
      method: 'POST',
      body: user,
      failOnStatusCode: false
    })
  );

  describe('POST /api/user', () =>
  {
    it('should add a valid user and respond with a JWT contianing their email', () =>
    {
      const email = 'user1@test.com'; 
      add({email, password: 'password'})
        .then((response) =>
        {
          const token = getJwt(response);
          expect(jwtDecode<any>(token).email).to.eq(email);
        });
    });

    it('should fail with an invalid email', () =>
    {
      add({email: 'test', password: 'password'})
        .its('status')
        .should('eq', 400);
    });

    it('should fail with an invalid password', () =>
    {
      add({email: 'test', password: '1'})
        .its('status')
        .should('eq', 400);
    });
  });

  describe('POST /api/user/login', () =>
  {
    beforeEach(() =>
    {
      getLoginUser().then((user) =>
      {
        this.user = user;
        seedUser(user);
      });
    });

    it('should login an existing user and respond with a JWT contianing their email', () =>
    {
      login(this.user)
      .then((response) =>
      {
        const token = getJwt(response);
        expect(jwtDecode<any>(token).email).to.eq(this.user.email);
      });
    });

    it('should not login a user that does not exist', () =>
    {
      login({email: 'test@test.com', password: 'password'})
        .its('status')
        .should('eq', 401);
    });

    it('should fail with an incorrect password', () =>
    {
      login({email: this.user.email, password: this.user.password + 'x'})
        .its('status')
        .should('eq', 401);
    });

    it('should fail with no email', () =>
    {
      login({password: 'password'})
        .its('status')
        .should('eq', 400);
    });

    it('should fail with no password', () =>
    {
      login({email: 'test'})
        .its('status')
        .should('eq', 400);
    });
  });
});