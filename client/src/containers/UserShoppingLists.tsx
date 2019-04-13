import { connect } from 'react-redux';
import { AppState } from '../store';
import ShoppingLists from '../components/shopping/ShoppingLists';
import { fetchLists, addList } from '../store/lists/actions';

const mapStateToProps = (state: AppState) =>
{
  return {
    lists: state.lists.lists,
    isFetching: state.lists.isFetching,
    isAdding: state.lists.isAdding,
    error: state.lists.error
  }
}

export default connect(
  mapStateToProps,
  { fetchLists, addList }
)(ShoppingLists);