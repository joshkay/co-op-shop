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
    display: 'flex'
  },
  navBrand: {
    textDecoration: 'none',
    color: 'inherit'
  },
  navLink: {
    marginLeft: 40,
    textDecoration: 'none',
    color: 'inherit'
  },
  navRightAlign: {
    marginLeft: 'auto'
  }
});

interface Props extends WithStyles<typeof styles>
{
  isAuthenticated: boolean;
  email: string | null;
  logoutUser: () => void;
}

class AppBar extends Component<Props>
{
  render()
  {
    const { classes, isAuthenticated, email, logoutUser } = this.props;
    
    let userActions = null;
    let protectedRoutes = null;

    if (isAuthenticated)
    {
      userActions = (
        <UserMenu className={classes.navRightAlign} email={email} logout={logoutUser} />
      );

      protectedRoutes = (
        <Link to='/lists' data-cy='navLists' className={classes.navLink}>
          <Typography variant="button" color="inherit">
            Lists
          </Typography>
        </Link>
      )
    }
    else
    {
      userActions = (
        <div className={classes.navRightAlign}>
          <NavbarLinkButton to="/login" color="inherit" data-cy='navLogin'>
            Sign In
          </NavbarLinkButton>
          <NavbarLinkButton to="/join" color="secondary" data-cy='navJoin'>
            Sign Up
          </NavbarLinkButton>
        </div>
      );
    }

    return (
      <nav className={classes.root}>
        <MuiAppBar elevation={0} position="static">
          <Toolbar data-cy='navbar'>
            <Link to='/' className={classes.navBrand} data-cy='navBrand'>
              <Typography variant="h6" color="inherit">
                Co-Op Shop
              </Typography>
            </Link>
            { protectedRoutes }
            { userActions }
          </Toolbar>
        </MuiAppBar>
      </nav>
    );
  }
}

export default withStyles(styles)(AppBar);