import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import TextField from '../forms/TextField';
import { required } from '../../forms/validations';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import {
  Save, Clear
} from '@material-ui/icons';

const styles = createStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignContent: 'center'
  },
  nameField: {
    marginLeft: 16,
    paddingRight: 60
  },
  clearButton: {
    alignSelf: 'center'
  }
});

interface StylesProps extends WithStyles<typeof styles> {}

interface Props 
{
  cancel(): void;
  saveList(name: string): void;
}

type AllProps = Props & StylesProps & InjectedFormProps<{}, Props>;

class EditListForm extends Component<AllProps> 
{
  constructor(props: AllProps)
  {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: any)
  {
    this.props.saveList(values.listName);
  }

  render()
  {
    const { classes, handleSubmit, submitting } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <IconButton aria-label="Submit" data-cy="editListCancel" className={classes.clearButton}
          disabled={submitting} onClick={this.props.cancel}>
          <Clear fontSize="default" />
        </IconButton>
        <Field className={classes.nameField} name="listName" id="listName" autoFocus autoComplete='nope'
          component={TextField} label="Name" validate={[required]} margin="none"
          data-cy="listName" multiline={true} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Submit" data-cy="editListSubmit"
            type="submit" color="primary" disabled={submitting}>
            <Save fontSize="default" />
          </IconButton>
        </ListItemSecondaryAction>
      </form>
    );
  }
}

export default reduxForm<{}, Props>({})(withStyles(styles)(EditListForm));