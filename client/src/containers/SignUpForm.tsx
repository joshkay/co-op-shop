import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import UserForm from '../components/accounts/UserForm';
import TextField from '../components/forms/TextField';
import { required, isEmail, doPasswordsMatch } from '../forms/validations';

interface Props
{

}

class SignUpForm extends Component<InjectedFormProps<Props>> 
{
  constructor(props: InjectedFormProps<Props>)
  {
    super(props);
  }

  handleSubmit(values: any)
  {
    console.log(values);
  }

  render()
  {
    const { handleSubmit, submitting } = this.props;

    return (
      <UserForm action="Sign up" canSubmit={!submitting} handleSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" id="email" autoFocus
          component={TextField} label="Email Address" fullWidth 
          validate={[required, isEmail]} />
        <Field name="password" type="password" id="password"
          component={TextField} label="Password" fullWidth
          validate={[required, doPasswordsMatch]} />
        <Field name="passwordConfirmation" type="password" id="passwordConfirmation"
          component={TextField} label="Password Confirmation" fullWidth />
      </UserForm>
    );
  }
}

export default reduxForm<Props>({
  form: 'SignUp'
})(SignUpForm);