import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

/**
 * 新しいreducerを宣言する場合、ここに足してください
 * （dispatchの型定義等で参照されます）
 */
const reducers = {
};
export type AnyAction = Parameters<typeof reducers[keyof typeof reducers]>[1];
export type Reducers = { [P in keyof (typeof reducers)]: TypeFilter<Parameters<(typeof reducers)[P]>[0], undefined> };
const rootReducer = combineReducers(reducers);
export const store = createStore(rootReducer, applyMiddleware(thunk));

type TypeFilter<T, Type> = T extends Type ? never : T;
