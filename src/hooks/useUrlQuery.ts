import { useCallback, useReducer } from 'react';

type Query<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type Reducer<T, K extends keyof T> = [mutator: Partial<T> | ((prev: Query<T, K>) => Query<T, K>), persistAll?: boolean];

export const useUrlQuery = <T, K extends keyof T>(initialState: Query<T, K>, optionalQuery: K[] = []) => {
  const [query, _setQuery] = useReducer((prev: Query<T, K>, [mutator, persistAll = false]: Reducer<T, K>) => {
    let oldData: Query<T, K> = prev;
    const newData = typeof mutator === 'function' ? mutator(prev) : mutator;

    if (!persistAll && optionalQuery.length) {
      oldData = Object.entries(oldData).reduce((acc, [_key]) => {
        const key = _key as K;
        if (optionalQuery.includes(key)) oldData[key] = undefined as any;
        else acc[key] = oldData[key] as T[K];
        return acc;
      }, {} as T);
    }

    return { ...oldData, ...newData };
  }, initialState);

  const setQuery = useCallback(
    (mutator: Reducer<T, K>[0], persistAll?: boolean) => _setQuery([mutator, persistAll]),
    []
  );

  return { query, setQuery };
};
