import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import TextField from '../forms/TextField';
import { required } from '../../forms/validations';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';

const styles = createStyles({
  root: {
    width: '100%'
  },
  nameField: {
    paddingRight: 60
  },
  addButton: {
    fontSize: 40
  }
});

interface StylesProps extends WithStyles<typeof styles> {}

interface Props 
{
  addList(name: string): void;
}

type AllProps = Props & StylesProps & InjectedFormProps<{}, Props>;

class NewListForm extends Component<AllProps> 
{
  constructor(props: AllProps)
  {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: any)
  {
    this.props.addList(values.listName);
  }

  render()
  {
    const { classes, handleSubmit, submitting } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <Field className={classes.nameField} name="listName" id="listName" autoFocus autoComplete='nope'
          component={TextField} label="Name" validate={[required]} margin="none"
          data-cy="listName" />
        <ListItemSecondaryAction>
          <IconButton aria-label="Submit" data-cy="newListSubmit"
            type="submit" color="primary" disabled={submitting}>
            <AddCircle className={classes.addButton} />
          </IconButton>
        </ListItemSecondaryAction>
      </form>
    );
  }
}

export default reduxForm<{}, Props>({
  form: 'NewList'
})(withStyles(styles)(NewListForm));