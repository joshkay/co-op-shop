import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import UserForm from '../components/accounts/UserForm';
import TextField from '../components/forms/TextField';
import { required, isEmail, doPasswordsMatch } from '../forms/validations';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { registerUser } from '../store/users/actions';

interface Props
{
  error: string | null,
  registerUser: (email: string, password: string) => void;
}

type AllProps = Props & InjectedFormProps<{}, Props>;

class SignUpForm extends Component<AllProps> 
{
  constructor(props: AllProps)
  {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: any)
  {
    this.props.registerUser(values.email, values.password);
  }

  render()
  {
    const { handleSubmit, submitting } = this.props;

    return (
      <UserForm action="Sign up" canSubmit={!submitting} handleSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="email" id="email" autoFocus autoComplete='nope'
          component={TextField} label="Email Address" fullWidth
          validate={[required, isEmail]} data-cy="email" />
        <Field name="password" type="password" id="password" autoComplete='new-password'
          component={TextField} label="Password" fullWidth
          validate={[required, doPasswordsMatch]} data-cy="password" />
        <Field name="passwordConfirmation" type="password" id="passwordConfirmation"
          component={TextField} label="Password Confirmation" fullWidth data-cy="passwordConfirmation" />
      </UserForm>
    );
  }
}

const reduxFormSignUp = reduxForm<{}, Props>({
  form: 'SignUp'
})(SignUpForm);

const mapStateToProps = (state: AppState) =>
{
  return {
    error: state.user.error
  }
}

export default connect(
  mapStateToProps, 
  { registerUser }  
)(reduxFormSignUp);