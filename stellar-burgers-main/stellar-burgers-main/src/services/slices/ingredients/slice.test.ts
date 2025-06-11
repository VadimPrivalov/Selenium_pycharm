import { getIngredientsThunk } from './actions';
import reducer, { initialState } from './slice';

describe('тест', () => {
  const ingredients = [
    {
      _id: '1',
      name: 'булочка',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '2',
      name: 'котлета',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '3',
      name: 'соус',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0
    }
  ];
  describe('getIngredientsThunk', () => {
    it('pending', () => {
      const action = { type: getIngredientsThunk.pending.type };
      const state = reducer(initialState, action);
      expect(state.isIngredientsLoading).toBe(true);
    });

    it('rej', () => {
      const action = {
        type: getIngredientsThunk.rejected.type,
        error: { message: 'Error' }
      };
      const state = reducer(initialState, action);
      expect(state.isIngredientsLoading).toBe(false);
      expect(state.error).toBe('Error');
    });

    it('fulf', () => {
      const payload = ingredients;
      const action = { type: getIngredientsThunk.fulfilled.type, payload };
      const state = reducer(initialState, action);
      expect(state.isIngredientsLoading).toBe(false);
      expect(state.ingredients).toEqual(ingredients);
    });
  });
});
