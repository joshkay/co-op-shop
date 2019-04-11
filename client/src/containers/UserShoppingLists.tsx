
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles({
  
});

interface Props extends WithStyles<typeof styles>
{
  
}

const UserShoppingLists: React.SFC<Props> = ({ classes }) =>
(
  <Typography variant='h1'>
    Lists
  </Typography> 
);

export default withStyles(styles)(UserShoppingLists);