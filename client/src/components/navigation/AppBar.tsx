import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavbarLinkButton from './NavbarLinkButton';
import UserMenu from '../accounts/UserMenu';

const styles = createStyles({
  root: {
    
  },
  homeLink: {
    flexGrow: 0,
    marginRight: 'auto',
    textDecoration: 'none',
    color: 'inherit'
  }
});

interface Props extends WithStyles<typeof styles>
{
  isAuthenticated: boolean;
  email: string | null;
  logoutUser(): void;
}

class AppBar extends Component<Props>
{
  render()
  {
    const { classes, isAuthenticated, email, logoutUser } = this.props;
    
    let userActions = null;

    if (isAuthenticated)
    {
      userActions = (
        <UserMenu email={email} logout={logoutUser} />
      );
    }
    else
    {
      userActions = (
        <React.Fragment>
          <NavbarLinkButton to="/login" color="inherit" data-cy='navLogin'>
            Sign In
          </NavbarLinkButton>
          <NavbarLinkButton to="/join" color="secondary" data-cy='navJoin'>
            Sign Up
          </NavbarLinkButton>
        </React.Fragment>
      );
    }

    return (
      <nav className={classes.root}>
        <MuiAppBar elevation={0} position="static">
          <Toolbar data-cy='navbar'>
            <Link to='/' className={classes.homeLink} data-cy='navBrand'>
              <Typography variant="h6" color="inherit">
                Co-Op Shop
              </Typography>
            </Link>
            { userActions }
          </Toolbar>
        </MuiAppBar>
      </nav>
    );
  }
}

export default withStyles(styles)(AppBar);