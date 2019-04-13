import React, { Component } from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import UserShoppingLists from '../containers/UserShoppingLists';

const styles = (theme: Theme) => createStyles({
  
});

interface Props extends WithStyles<typeof styles>
{
  
}

class ListsPage extends Component<Props>
{
  render()
  {
    const { classes } = this.props;

    return (
      <UserShoppingLists />
    );
  }
}

export default withStyles(styles)(ListsPage);