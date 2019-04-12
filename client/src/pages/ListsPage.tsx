import React, { Component } from 'react';
import { Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ShoppingLists from '../components/shopping/ShoppingLists';

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
      <ShoppingLists />
    );
  }
}

export default withStyles(styles)(ListsPage);