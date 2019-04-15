import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from '../store/users/reducers';
import { listsReducer } from '../store/lists/reducers';
import { itemsReducer } from '../store/items/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  lists: listsReducer,
  items: itemsReducer
});

export const configureStore = () =>
{
  let store: Store;

  store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );
  
  if (process.env.NODE_ENV !== 'production')
  {
    store.subscribe(() => console.log(store.getState()));
  }

  return store;
}

let appStore: Store = configureStore();
export const store = appStore;

export type AppState = ReturnType<typeof rootReducer>;