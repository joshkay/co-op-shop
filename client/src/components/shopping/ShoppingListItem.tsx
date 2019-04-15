import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { Item, ItemState, ItemUpdates } from '../../store/items/types';
import { List } from '../../store/lists/types';
import EditListForm from './EditListForm';
import { MoreVert, 
  LocalGroceryStore,
  LocalGroceryStoreOutlined,
  Save, Add, Cancel
} from '@material-ui/icons';

const styles = (theme: Theme) => createStyles({
  purchasedCheckbox:
  {
    color: theme.palette.secondary.dark
  },
  purchasedRow:
  {
    //backgroundColor: theme.palette.primary.light
  },
  nonPurchasedRow:
  {

  }
});

interface Props extends WithStyles<typeof styles>
{
  key: number;
  item: Item;
  list: List | undefined;
  addItem: (list: List, name: string) => void;
  updateItem: (list: List, item: Item, updates: ItemUpdates) => void;
  deleteItem: (list: List, item: Item) => void;
}

interface State
{
  menuAnchorEl: any;
  editing: boolean;
}

class ShoppingListItem extends Component<Props, State>
{
  constructor(props: Props)
  {
    super(props);

    this.state = {
      menuAnchorEl: null,
      editing: false
    };

    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleUpdateItemPurchased = this.handleUpdateItemPurchased.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }

  handleShowMenu(event: any)
  {
    this.setState({ menuAnchorEl: event.currentTarget });
  }

  handleCloseMenu()
  {
    this.setState({ menuAnchorEl: null });
  }

  handleStartEdit()
  {
    this.handleCloseMenu();
    this.setState({ editing: true });
  }

  handleCancelEdit()
  {
    this.setState({ editing: false });
  }

  handleEditItem(name: string)
  {
    this.handleCancelEdit();

    const { list, updateItem, item } = this.props;
    if (list)
    {
      updateItem(list, item, {
        name
      });
    }
  }

  handleDeleteItem()
  {
    this.handleCloseMenu();

    const { list, deleteItem, item } = this.props;
    if (list)
    {
      deleteItem(list, item);
    }
  }

  handleUpdateItemPurchased(e: any)
  {
    const { list, updateItem, item } = this.props;
    if (list)
    {
      const purchased = e.target.checked;
      updateItem(list, item, {
        purchased
      });
    }
  }

  render()
  {
    const { classes, key, item } = this.props;
    const { menuAnchorEl, editing } = this.state;

    const content = editing ? (
      <ListItem>
        <EditListForm saveList={this.handleEditItem} cancel={this.handleCancelEdit} 
          initialValues={{listName: item.name}} form={`EditItem/${item.id}`} />
      </ListItem>
    ) :
    (
      <ListItem key={key}
        className={item.purchased ? classes.purchasedRow : classes.nonPurchasedRow}>
        <Checkbox
          icon={<LocalGroceryStoreOutlined />}
          checkedIcon={<LocalGroceryStore className={classes.purchasedCheckbox} />}
          onChange={(e) => this.handleUpdateItemPurchased(e)}
          checked={item.purchased}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          primary={item.name}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => this.handleShowMenu(e)}
            aria-label="ItemActions">
            <MoreVert />
          </IconButton>
          <Menu
            id="item-actions-menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={this.handleCloseMenu}
          >
            <MenuItem onClick={this.handleDeleteItem}>Delete</MenuItem>
            <MenuItem onClick={this.handleStartEdit}>Edit</MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );

    return content;
  }
}

export default withStyles(styles)(ShoppingListItem);