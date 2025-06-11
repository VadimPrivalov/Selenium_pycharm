import { orderBurgerThunk } from './actions';
import reducer, { initialState } from './slice';

describe('тест', () => {
  const ingredients = ['1', '2', '3', '1'];
  describe('orderBurgerThunk', () => {
    it('pending', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const payload = {
        order: ingredients
      };
      const action = { type: orderBurgerThunk.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.isOrderLoading).toBe(false);
      expect(state.order).toEqual(ingredients);
    });
  });
});
