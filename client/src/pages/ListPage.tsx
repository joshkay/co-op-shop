import React, { Component } from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import UserShoppingList from '../containers/UserShoppingList';

const styles = (theme: Theme) => createStyles({
  
});

interface Props extends WithStyles<typeof styles>
{
  match:
  {
    params:
    {
      listId: string;
    }
  }
}

class ListPage extends Component<Props>
{
  render()
  {
    const { classes, match: { params } } = this.props;

    return (
      <UserShoppingList listId={Number(params.listId)} />
    );
  }
}

export default withStyles(styles)(ListPage);