import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText
} from '@material-ui/core';

interface Props
{
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

interface State
{
  open: boolean;
}

class ConfirmationDialog extends Component<Props, State>
{
  constructor(props: Props) 
  {
    super(props);

    this.state = {
      open: true
    };
  }

  handleCancel = () => 
  {
    this.props.onCancel();
  }

  handleConfirm()
  {
    this.props.onConfirm();;
  }

  render() 
  {
    const { title, content } = this.props;

    return (
      <Dialog
        open={this.state.open}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}