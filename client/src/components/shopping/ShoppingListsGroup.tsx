import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, 
  List as MuiList,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Button
} from '@material-ui/core';
import { List } from '../../store/lists/types';
import NewListForm from './NewListForm';

const styles = (theme: Theme) => createStyles({
  main: 
  {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]:
    {
      padding: 2 * theme.spacing.unit,
    },
  },
});

interface Props extends WithStyles<typeof styles>
{
  allowAdd: boolean;
  header: string;
  isAdding: boolean;
  error: string | null;
  addList: (name: string) => void;
  lists: List[];
}

interface State
{
  showNewList: boolean;
}

class ShoppingListsGroup extends Component<Props, State>
{
  constructor(props: Props)
  {
    super(props);

    this.state = {
      showNewList: false
    };

    this.handleNewList = this.handleNewList.bind(this);
  }

  handleNewList()
  {
    this.setState({
      showNewList: true
    });
  }

  componentDidUpdate(oldProps: Props)
  {
    // item was added successfully if isAdding changed from true -> false with no error
    if (!this.props.error && oldProps.isAdding && !this.props.isAdding)
    {
      this.setState({
        showNewList: false
      });
    }
  }

  render()
  {
    const { classes, header, lists, allowAdd, addList, isAdding } = this.props;
    const { showNewList } = this.state;

    const listItems = lists ? lists.map((list, index) =>
    (
      <ListItem key={index} button>
        <ListItemText
          primary={list.name}
        />
      </ListItem>
    )) : null;

    const addButton = allowAdd && !showNewList ? (
      <Button color="primary" variant="contained" onClick={this.handleNewList}
        data-cy="newList">
        New List
      </Button>
    ) : null;

    const addListItem = showNewList ? (
      <ListItem>
        <NewListForm addList={addList} />
      </ListItem>
    ) : null;

    const listPaper = lists.length > 0 || showNewList ? (
      <Grid item xs={12}>
        <Paper>
          <MuiList>
            {addListItem}
            {listItems}
          </MuiList>
        </Paper>
      </Grid>
    ) : null;

    return (
      <Grid container alignItems='center'>
        <Grid item>
          <Typography className={classes.main} variant="h4">
            {header}
          </Typography>
        </Grid> 
        {addButton}
        {listPaper}
      </Grid>
    );
  }
}

export default withStyles(styles)(ShoppingListsGroup);