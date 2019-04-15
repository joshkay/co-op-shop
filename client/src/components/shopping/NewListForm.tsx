import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import TextField from '../forms/TextField';
import { required } from '../../forms/validations';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import {
  Add, Clear
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
  addList(name: string): void;
  multiline: boolean;
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
    const { classes, handleSubmit, submitting, multiline } = this.props;

    return (
      <form className={classes.root} onSubmit={handleSubmit(this.handleSubmit)}>
        <IconButton aria-label="Submit" data-cy="newListCancel" className={classes.clearButton}
          disabled={submitting} onClick={this.props.cancel}>
          <Clear fontSize="default" />
        </IconButton>
        <Field className={classes.nameField} name="listName" id="listName" autoFocus autoComplete='nope'
          component={TextField} label="Name" validate={[required]} margin="none"
          data-cy="listName" multiline={multiline} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Submit" data-cy="newListSubmit"
            type="submit" color="primary" disabled={submitting}>
            <Add fontSize="default" />
          </IconButton>
        </ListItemSecondaryAction>
      </form>
    );
  }
}

export default reduxForm<{}, Props>({})(withStyles(styles)(NewListForm));