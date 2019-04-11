
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles({
  root: {
    height: '80vh'
  }
});

interface Props extends WithStyles<typeof styles>
{
  
}

const NotFoundPage: React.SFC<Props> = ({ classes }) =>
(
  <Grid container className={classes.root} justify='center' alignItems='center'>
    <Grid item>
      <Typography color='primary' variant='h1'>
        Nothing to see here!
      </Typography> 
    </Grid>
  </Grid>
);

export default withStyles(styles)(NotFoundPage);