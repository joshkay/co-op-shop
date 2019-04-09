import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavbarLinkButton from './NavbarLinkButton';

const styles = createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
});

interface Props extends WithStyles<typeof styles>
{

}

class AppBar extends Component<Props>
{
  render()
  {
    const { classes } = this.props;

    return (
      <nav className={classes.root}>
        <MuiAppBar elevation={0} position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Co-Op Shop
            </Typography>
            <NavbarLinkButton to="/login" color="inherit">Sign In</NavbarLinkButton>
            <NavbarLinkButton to="/join" color="secondary">Sign Up</NavbarLinkButton>
          </Toolbar>
        </MuiAppBar>
      </nav>
    );
  }
}

export default withStyles(styles)(AppBar);