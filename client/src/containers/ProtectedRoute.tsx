import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import { AppState } from '../store';
import { connect } from 'react-redux';

interface Props
{
  redirect?: LocationDescriptor;
  allow?: 'authenticated' | 'unauthenticated';
  component: any;
  [rest: string]: any 
}

interface ReduxProps
{
  isAuthorized: boolean;
}

type AllProps = Props & ReduxProps;

const ProtectedRoute: React.SFC<AllProps> = ({ redirect, allow, isAuthorized, component: Component, ...rest }) => 
(
  <Route {...rest} render={(props) =>
    {
      if (isAuthorized)
      {
        return <Component {...props} />;
      }
      else
      {
        return <Redirect to={redirect as LocationDescriptor} />;
      }
    }}
  />
);

const mapStateToProps = (state: AppState, 
  { allow='authenticated', component, redirect='/' }: Props) =>
{
  const authenticated = state.user.isAuthenticated;
  const isAuthorized = allow === 'authenticated' ? authenticated : !authenticated;

  return {
    isAuthorized,
    redirect: redirect,
    component: component
  };
}

const ConnectedProtectedRoute = connect(
  mapStateToProps
)(ProtectedRoute);

export default ConnectedProtectedRoute;