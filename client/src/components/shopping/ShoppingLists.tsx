import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { List } from '../../store/lists/types';
import ShoppingListsGroup from './ShoppingListsGroup';

const styles = (theme: Theme) => createStyles({
  main: 
  {
    padding: 3 * theme.spacing.unit,
    paddingTop: 0,
    [theme.breakpoints.down('xs')]:
    {
      padding: 2 * theme.spacing.unit,
    },
  }
});

interface Props extends WithStyles<typeof styles>
{
  lists: List[];
  isFetching: boolean;
  isAdding: boolean;
  error: string | null;
  fetchLists: () => void;
  addList: (name: string) => void;
}

class ShoppingLists extends Component<Props>
{
  componentDidMount()
  {
    this.props.fetchLists();
  }

  render()
  {
    const { classes, lists, isAdding, addList, error } = this.props;

    return (
      <main className={classes.main}>
        <Grid container justify="center">
          <Grid item data-cy="listUsers" xs={12} md={8} lg={6}>
            <ShoppingListsGroup header="Your Lists" lists={lists} 
              allowAdd isAdding={isAdding} addList={addList} error={error} />
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(ShoppingLists);