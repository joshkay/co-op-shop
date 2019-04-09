import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

interface CheckboxProps
{
  input: any,
  label: string
}

const Checkbox: React.SFC<CheckboxProps> = ({ input, label }) => 
(
  <FormControlLabel
    control={
      <MuiCheckbox color="primary" checked={input.value ? true : false} onChange={input.onChange} />
    }
    label={label} 
  />
);

export default Checkbox;