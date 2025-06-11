import store, { rootReducer } from '../store';

describe('тест', () => {
  it('хранилище', () => {
    const initialState = store.getState();
    const unknownAction = { type: 'type' };

    const result = rootReducer(undefined, unknownAction);

    expect(result).toEqual(initialState);
  });
});
