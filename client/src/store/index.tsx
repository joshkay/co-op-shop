import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { userReducer } from '../store/users/reducers';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer
});

export const configureStore = () =>
{
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
};

export type AppState = ReturnType<typeof rootReducer>