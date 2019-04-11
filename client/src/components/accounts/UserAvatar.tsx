import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 0
  },
  avatar: {
    margin: 0,
    backgroundColor: theme.palette.secondary.dark,
  }
});

interface Props extends WithStyles<typeof styles>
{
  letter: string | null;
}

class UserAvatar extends Component<Props> 
{
  render()
  {
    const { classes, letter } = this.props;

    return (
      <Avatar className={classes.avatar}>
        { letter }
      </Avatar>
    );
  }
}

export default withStyles(styles)(UserAvatar);