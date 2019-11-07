import { AnyAction, store } from './store';

/**
 * thunk用に関数も引数にとれるようdispatchをラップする関数
 * actionのtypeが確定すると、各Reducerに定義されているtypeごとに必要なプロパティをチェック、インテリセンスでサジェストできる
 */
export function storeDispatch<T extends AnyAction>(action: T): T;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
export function storeDispatch<T>(action: (dispatch: typeof storeDispatch) => T): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function storeDispatch(action: any) {
  return store.dispatch(action);
}
