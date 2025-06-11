import reducer, { initialState } from './slice';

import {
  loginUserThunk,
  logoutUserThunk,
  getUserThunk,
  registerUserThunk,
  updateUserThunk,
  getOrdersThunk
} from './actions';

const user = {
  name: 'Renet',
  email: 'Renet@Renet.com'
};

const user2 = {
  name: 'Renet',
  email: 'Renet@Renet.com'
};

const order = {
  _id: '1',
  ingredients: ['котлета', 'соус'],
  status: 'done',
  name: 'заказ',
  number: 1,
  createdAt: '2025-06-09T12:43:30.041Z',
  updatedAt: '2025-06-09T12:43:30.041Z'
};

describe('тест', () => {
  describe('loginUserThunk', () => {
    it('pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('rej', () => {
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const action = { type: loginUserThunk.fulfilled.type, payload: user };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('logoutUserThunk', () => {
    it('pending', () => {
      const state = { ...initialState, user: user, isAuthenticated: true };
      const action = { type: logoutUserThunk.pending.type };
      const result = reducer(state, action);
      expect(result.user).toBeNull();
      expect(result.isAuthenticated).toBe(false);
    });
  });

  describe('getUserThunk', () => {
    it('pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: getUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.user).toBeNull();
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: { user: user }
      };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('registerUserThunk', () => {
    it('pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: user
      };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('updateUserThunk', () => {
    it('pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: { user: user2 }
      };
      const state = reducer({ ...initialState, user: user }, action);
      expect(state.user).toEqual(user2);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('getOrdersThunk', () => {
    it('pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.ordersRequest).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: getOrdersThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.error).toBe('Error');
      expect(state.ordersRequest).toBe(false);
    });

    it('fulf', () => {
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: [order]
      };
      const state = reducer(initialState, action);
      expect(state.orders).toEqual([order]);
      expect(state.ordersRequest).toBe(false);
    });
  });
});
