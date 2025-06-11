import reducer, {
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearBurgerConstructor,
  initialState
} from './slice';

describe('тест', () => {
  const bun = {
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
  };

  const main = {
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
  };

  describe('добавить', () => {
    it('булочка', () => {
      const action = addIngredient(bun);
      const result = reducer(initialState, action);

      expect(result.burgerConstructor.bun).toEqual({
        ...bun,
        id: expect.any(String)
      });
      expect(result.burgerConstructor.ingredients).toHaveLength(0);
    });

    it('котлета', () => {
      const action = addIngredient(main);
      const result = reducer(initialState, action);

      expect(result.burgerConstructor.bun).toBeNull();
      expect(result.burgerConstructor.ingredients).toEqual([
        {
          ...main,
          id: expect.any(String)
        }
      ]);
    });
  });

  describe('тест', () => {
    it('поднять', () => {
      const initialStateit = {
        ...initialState,
        burgerConstructor: {
          bun: null,
          ingredients: [
            { ...main, id: '1' },
            { ...main, id: '2' },
            { ...main, id: '3' }
          ]
        }
      };

      const result = reducer(initialStateit, upIngredient(1));

      expect(result.burgerConstructor.ingredients.map((i) => i.id)).toEqual([
        '2',
        '1',
        '3'
      ]);
    });
  });

  describe('тест', () => {
    it('опустить', () => {
      const initialStateit = {
        ...initialState,
        burgerConstructor: {
          bun: null,
          ingredients: [
            { ...main, id: '1' },
            { ...main, id: '2' },
            { ...main, id: '3' }
          ]
        }
      };

      const result = reducer(initialStateit, downIngredient(1));

      expect(result.burgerConstructor.ingredients.map((i) => i.id)).toEqual([
        '1',
        '3',
        '2'
      ]);
    });
  });

  describe('тест', () => {
    it('удалить', () => {
      const initialStateit = {
        ...initialState,
        burgerConstructor: {
          bun: null,
          ingredients: [
            { ...main, id: '1' },
            { ...main, id: '2' }
          ]
        }
      };

      const action = removeIngredient({ ...main, id: '1' });
      const result = reducer(initialStateit, action);

      expect(result.burgerConstructor.ingredients).toEqual([
        { ...main, id: '2' }
      ]);
    });
  });

  describe('тест', () => {
    it('очистить', () => {
      const initialStateit = {
        ...initialState,
        burgerConstructor: {
          bun: { ...bun, id: '1' },
          ingredients: [
            { ...main, id: '2' },
            { ...main, id: '3' }
          ]
        }
      };

      const result = reducer(initialStateit, clearBurgerConstructor());

      expect(result.burgerConstructor.bun).toBeNull();
      expect(result.burgerConstructor.ingredients).toHaveLength(0);
    });
  });
});
