import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { List } from '../../store/lists/types';
import NewListForm from './NewListForm';
import { 
  Typography, 
  List as MuiList,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Button
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Item, ItemState, ItemUpdates } from '../../store/items/types';

const styles = (theme: Theme) => createStyles({
  main: 
  {
    padding: 3 * theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    [theme.breakpoints.down('xs')]:
    {
      padding: 2 * theme.spacing.unit,
    },
  },
  header:
  {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]:
    {
      padding: 2 * theme.spacing.unit,
    },
  }
});

interface Props extends WithStyles<typeof styles>
{
  listId: number;
  list: List | undefined;
  items: ItemState[];
  isFetching: boolean;
  isAdding: boolean;
  error: string | null;
  fetchListWithItems: (id: number) => void;
  fetchItems: (list: List) => void;
  addItem: (list: List, name: string) => void;
  updateItem: (list: List, item: Item, updates: ItemUpdates) => void;
  deleteItem: (list: List, item: Item) => void;
}

interface State
{
  showNewList: boolean;
}

class ShoppingList extends Component<Props, State>
{
  constructor(props: Props)
  {
    super(props);

    this.state = {
      showNewList: false
    };

    this.handleNewListVisibility = this.handleNewListVisibility.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleUpdateItemPurchased = this.handleUpdateItemPurchased.bind(this);
  }

  componentDidMount()
  {
    const { fetchItems, fetchListWithItems, list, listId } = this.props;

    if (list != undefined)
    {
      fetchItems(list as List);
      console.log('fetch items')
    }
    else
    {
      fetchListWithItems(listId);
      console.log('fetch list')
    }
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
  
  handleNewListVisibility()
  {
    this.setState({
      showNewList: true
    });
  }

  handleAddItem(name: string)
  {
    if (this.props.list)
    {
      this.props.addItem(this.props.list, name);
    }
  }

  handleDeleteItem(item: Item)
  {
    if (this.props.list)
    {
      this.props.deleteItem(this.props.list, item);
    }
  }

  handleUpdateItemPurchased(e: any, item: Item)
  {
    if (this.props.list)
    {
      const purchased = e.target.checked;
      this.props.updateItem(this.props.list, item, {
        purchased
      });
    }
  }

  render()
  {
    const { classes, list, items, isAdding, error } = this.props;
    const { showNewList } = this.state;

    const listItems = items ? items.map((item, index) =>
    (
      <ListItem key={index}>
        <Checkbox
          onChange={(e) => this.handleUpdateItemPurchased(e, item.item)}
          checked={item.item.purchased}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          primary={item.item.name}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => this.handleDeleteItem(item.item)} 
            aria-label="Delete">
            <Delete  />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )) : null;

    const addButton = !showNewList ? (
      <Button color="primary" variant="contained" onClick={this.handleNewListVisibility}
        data-cy="newList">
        Add Item
      </Button>
    ) : null;

    const addItemListItem = showNewList ? (
      <ListItem>
        <NewListForm addList={this.handleAddItem} />
      </ListItem>
    ) : null;

    const listPaper = items.length > 0 || showNewList ? (
      <Grid item xs={12}>
        <Paper>
          <MuiList>
            {addItemListItem}
            {listItems}
          </MuiList>
        </Paper>
      </Grid>
    ) : null;

    return (
      <main className={classes.main}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={8} lg={6}>
            <Grid container alignItems='center'>
              <Grid item>
                <Typography className={classes.header} variant="h4">
                  {list ? list.name : null}
                </Typography>
              </Grid>
              {addButton}
              {listPaper}
            </Grid>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(ShoppingList);