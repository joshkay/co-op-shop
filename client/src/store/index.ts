import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from '../store/users/reducers';
import { listsReducer } from '../store/lists/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  lists: listsReducer
});

export const configureStore = () =>
{
  const store = createStore(
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
};

export const store = configureStore();

export type AppState = ReturnType<typeof rootReducer>;