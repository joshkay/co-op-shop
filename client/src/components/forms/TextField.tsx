import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

interface TextFieldProps
{
  input?: any;
  className?: string;
  id: string;
  required?: boolean;
  margin?:  "none" | "dense" | "normal" | undefined;
  name: string;
  label: string;
  meta: {
    touched: boolean;
    error: any;
  };
  custom?: any;
  multiline?: boolean;
}

const TextField: React.SFC<TextFieldProps> = ({ className, input, id, name, required = false, 
  label, margin = "normal", multiline = false, meta: { touched, error }, ...custom }) => 
{
  const showError: boolean = (touched && error) ? true : false;
  const errorElementId: string = `${id}-text`;
  const errorElement: JSX.Element | null = showError ? (
    <FormHelperText data-cy="field-error" id={errorElementId}>
      {error}
    </FormHelperText>
  ) : null;

  return (
    <FormControl className={className} margin={margin} fullWidth error={showError}>
      <InputLabel data-cy="field-label" htmlFor={id} required={required}>
        {label}
      </InputLabel>
      {/* value={input.value} onChange={input.onChange} */}
      <Input id={id} name={name} {...custom} {...input} multiline={multiline}
        aria-describedby={error ? errorElementId : ''} />
      {errorElement}
    </FormControl>
  );
};

export default TextField;