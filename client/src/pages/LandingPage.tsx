import React, { Component } from 'react';
import { Grid, Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { List, AccessTime, Update } from '@material-ui/icons';
import FeatureListing from '../components/FeatureListing';

const styles = (theme: Theme) => createStyles({
  landingImage: {
    backgroundImage: 'url(images/bananas-supermarket.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    display: 'flex',
    alignItems: 'center',
    height: '75vh'
  },
  landingPromo: {
    width: '200px',
    marginLeft: '4%'
  },
  landingHeader: {
    color: theme.palette.common.white,
    fontWeight: 900,
    fontSize: '5rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '6rem'
    },
  }
});

interface Props extends WithStyles<typeof styles>
{
  
}

class LandingPage extends Component<Props>
{
  render()
  {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.landingImage} data-cy="landing-container">
          <div className={classes.landingPromo}>
            <Typography variant="h1" className={classes.landingHeader} data-cy="landing-header">
              Simply Shop
            </Typography>
          </div>
        </main>
        <Grid container alignItems="stretch" justify="center" data-cy="landing-features">
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<List />}
              name="Never Forget"
              description="Keep track of what you need to buy with easy to manage shopping lists."
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<AccessTime />}
              name="Save Time"
              description="Split up to shop by inviting your friends and family to view and update your shopping lists."
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<Update />}
              name="Real-time Updates"
              description="Lists are kept in sync for everyone viewing them.  Mark off items as you shop so everyone can see what you bought!"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LandingPage);