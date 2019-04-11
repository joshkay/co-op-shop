import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import UserForm from '../components/accounts/UserForm';
import TextField from '../components/forms/TextField';
import Checkbox from '../components/forms/Checkbox';
import { required, isEmail } from '../forms/validations';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { loginUser } from '../store/users/actions';

interface Props
{
  error: string | null,
  loginUser(email: string, password: string): void;
}

type AllProps = Props & InjectedFormProps<{}, Props>;

class SignInForm extends Component<AllProps> 
{
  constructor(props: AllProps)
  {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: any)
  {
    this.props.loginUser(values.email, values.password);
  }

  render()
  {
    const { submitting, handleSubmit } = this.props;

    return (
      <UserForm action="Sign in" canSubmit={!submitting} handleSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" id="email" autoComplete="email" autoFocus
          component={TextField} label="Email Address" fullWidth
          validate={[required, isEmail]} />
        <Field name="password" type="password" id="password" autoComplete="current-password" 
          component={TextField} label="Password" fullWidth 
          validate={required} />
        <Field name="remember" component={Checkbox} label="Remember me" />
      </UserForm>
    );
  }
}

const reduxFormSignIn = reduxForm<{}, Props>({
  form: 'SignIn'
})(SignInForm);

const mapStateToProps = (state: AppState) =>
{
  return {
    error: state.user.error
  }
}

export default connect(
  mapStateToProps, 
  { loginUser }  
)(reduxFormSignIn);