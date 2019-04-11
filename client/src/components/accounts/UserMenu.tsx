import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Popper, IconButton, ClickAwayListener, MenuList, MenuItem, Paper } from '@material-ui/core';
import UserAvatar from './UserAvatar';

const styles = (theme: Theme) => createStyles({
  
});

interface Props extends WithStyles<typeof styles>
{
  email: string | null;
  logout(): void;
}

interface State
{
  open: boolean;
}

class UserMenu extends Component<Props, State> 
{
  menuAnchor: any;

  constructor(props: Props)
  {
    super(props);

    this.state = {
      open: false,
    };

    this.menuAnchor = null;

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleToggle()
  {
    this.setState(state => ({ open: !state.open }));
  }

  handleClose(event: any)
  {
    if (this.menuAnchor.contains(event.target)) 
    {
      return;
    }

    this.setState({ open: false });
  }

  handleLogout(event: any)
  {
    this.handleClose(event);
    
    this.props.logout();
  }

  render()
  {
    const { classes, email } = this.props;
    const { open } = this.state;

    const letter = email ? email[0].toUpperCase() : null

    return (
      <React.Fragment>
        <IconButton 
          buttonRef={node => {
            this.menuAnchor = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <UserAvatar letter={letter} />
        </IconButton >
        <Popper open={open} anchorEl={this.menuAnchor} disablePortal>
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserMenu);
