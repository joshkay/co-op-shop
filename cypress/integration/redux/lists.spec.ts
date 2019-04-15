/// <reference types="cypress"/>

import { configureStore } from '../../../client/src/store';
import { List } from '../../../client/src/store/lists/types';
import { Item } from '../../../client/src/store/items/types';

import {
  receiveLists, requestAddListSuccess
} from '../../../client/src/store/lists/actions';
import {
  userUnauthenticated
} from '../../../client/src/store/users/actions';

describe('Redux - Lists', () =>
{
  beforeEach(() =>
  {
    this.store = configureStore();
  });

  context('auth', () =>
  {
    it('should clear the store on logout', () =>
    {
      const lists: List[] = 
      [{
        id: 0,
        name: 'redux',
        items:[],
        owned: true
      },
      {
        id: 1,
        name: 'tests',
        items:[],
        owned: true
      },
      {
        id: 2,
        name: 'functions',
        items:[],
        owned: false
      }];
      
      this.store.dispatch(receiveLists(lists));

      expect(Object.keys(this.store.getState().lists.lists).length).to.eq(lists.length);

      this.store.dispatch(userUnauthenticated());

      expect(Object.keys(this.store.getState().lists.lists).length).to.eq(0);
    });
  });

  context('fetching', () =>
  {
    it('should fetch lists into the state, replacing old lists', () =>
    {
      expect(this.store.getState().lists.lists).to.be.empty;
  
      const lists: List[] = 
      [{
        id: 0,
        name: 'redux',
        items: [],
        owned: true
      },
      {
        id: 1,
        name: 'tests',
        items: [],
        owned: true
      },
      {
        id: 2,
        name: 'functions',
        items: [],
        owned: false
      }];

      this.store.dispatch(receiveLists(lists));
  
      expect(this.store.getState().lists.lists[0]).to.include(lists[0]);
      expect(this.store.getState().lists.lists[1]).to.include(lists[1]);
      expect(this.store.getState().lists.lists[2]).to.include(lists[2]);

      const anotherList: List = 
      {
        id: 5,
        name: 'more',
        items: [],
        owned: false
      };
  
      this.store.dispatch(receiveLists([anotherList]));
  
      expect(this.store.getState().lists.lists).to.not.have.keys('0','1','2');
      expect(this.store.getState().lists.lists[5]).to.include(anotherList);
    });
  });

  context('adding', () =>
  {
    it('should add a new list into the state', () =>
    {
      expect(this.store.getState().lists.lists).to.be.empty;

      const lists: List[] = 
      [{
        id: 0,
        name: 'action',
        items: [],
        owned: true
      },
      {
        id: 1,
        name: 'type',
        items: [],
        owned: false
      }];

      this.store.dispatch(requestAddListSuccess(lists[0]));

      expect(this.store.getState().lists.lists[0]).to.include(lists[0]);

      this.store.dispatch(requestAddListSuccess(lists[1]));

      expect(this.store.getState().lists.lists[1]).to.include(lists[1]);
    });
  });
});