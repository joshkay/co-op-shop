import React, { Component } from 'react';
import SignInForm from '../containers/SignInForm';

interface Props
{

}

class SignInPage extends Component<Props> 
{
  render()
  {
    return (
      <SignInForm />
    );
  }
}

export default SignInPage;