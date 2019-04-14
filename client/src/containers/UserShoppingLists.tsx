import { connect } from 'react-redux';
import { AppState } from '../store';
import ShoppingLists from '../components/shopping/ShoppingLists';
import { fetchLists, addList } from '../store/lists/actions';

const mapStateToProps = (state: AppState) =>
{
  const lists = state.lists.lists ?
    Object.keys(state.lists.lists).map((key: string) =>
    {
      return state.lists.lists[Number(key)];
    }) : [];

  return {
    lists: lists,
    isFetching: state.lists.isFetching,
    isAdding: state.lists.isAdding,
    error: state.lists.error
  }
}

export default connect(
  mapStateToProps,
  { fetchLists, addList }
)(ShoppingLists);