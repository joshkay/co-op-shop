import * as React from "react";

import Button, { ButtonProps } from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { History } from "history";

/**
 * Issue from: https://github.com/mui-org/material-ui/issues/13218
 */

interface NavbarLinkButtonProps extends ButtonProps
{
  to: History.LocationDescriptor;
  children: any;
}

const NavbarLinkButton: React.SFC<NavbarLinkButtonProps> = ({
  to,
  children,
  ...rest
}) => 
{
  const NavbarLink: React.SFC<any> = props => <Link to={to} {...props} />;

  return (
    <Button component={NavbarLink} {...rest}>
      {children}
    </Button>
  );
};

export default NavbarLinkButton;