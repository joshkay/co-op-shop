import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

interface TextFieldProps
{
  input?: any;
  id: string;
  required?: boolean;
  name: string;
  label: string;
  meta: {
    touched: boolean;
    error: any;
  };
  custom?: any;
}

const TextField: React.SFC<TextFieldProps> = ({ input, id, name, required = false, label, meta: { touched, error }, ...custom }) => 
{
  const showError: boolean = (touched && error) ? true : false;
  const errorElementId: string = `${id}-text`;
  const errorElement: JSX.Element | null = showError ? (
    <FormHelperText id={errorElementId}>{error}</FormHelperText>
  ) : null;

  return (
    <FormControl margin="normal" fullWidth error={showError}>
      <InputLabel htmlFor={id} required={required}>{label}</InputLabel>
      {/* value={input.value} onChange={input.onChange} */}
      <Input id={id} name={name} {...custom} {...input}
        aria-describedby={error ? errorElementId : ''} />
      {errorElement}
    </FormControl>
  );
};

export default TextField;