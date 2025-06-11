import reducer, { initialState } from './slice';
import { getFeedsThunk, getOrderByNumberThunk } from './actions';

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
  describe('getFeedsThunk', () => {
    it('pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.isFeedsLoading).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.isFeedsLoading).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const payload = {
        orders: [order],
        total: 100,
        totalToday: 10
      };
      const action = { type: getFeedsThunk.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.isFeedsLoading).toBe(false);
      expect(state.orders).toEqual([order]);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });
  });

  describe('getOrderByNumberThunk', () => {
    it('pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const payload = { orders: [order] };
      const action = { type: getOrderByNumberThunk.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(false);
      expect(state.order).toEqual(order);
    });
  });
});
