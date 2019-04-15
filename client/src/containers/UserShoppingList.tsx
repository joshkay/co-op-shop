import { connect } from 'react-redux';
import { AppState } from '../store';
import ShoppingList from '../components/shopping/ShoppingList';
import { 
  fetchItems, addItem, updateItem, deleteItem
} from '../store/items/actions';
import {
  fetchListWithItems,
  startViewingList,
  stopViewingList
} from '../store/lists/actions';

interface Props
{
  listId: number;
}

const mapStateToProps = (state: AppState, ownProps: Props) =>
{
  const list = state.lists.lists[ownProps.listId];
  const items = (list && list.items) ? list.items.map(itemId =>
  {
    return state.items.items[itemId];
  }) : [];

  return {
    listId: ownProps.listId,
    list: list,
    items: items,
    isFetching: state.items.isFetching,
    isAdding: state.items.isAdding,
    error: state.items.error
  }
}

export default connect(
  mapStateToProps,
  { fetchListWithItems, fetchItems, addItem, updateItem, 
    deleteItem, startViewingList, stopViewingList }
)(ShoppingList);