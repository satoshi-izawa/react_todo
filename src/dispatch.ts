import { AnyAction, store } from './store';

/**
 * thunk用に関数も引数にとれるようstoreのdispatchをラップする関数
 * actionのtypeが確定すると、各Reducerに定義されているtypeごとに必要なプロパティをチェック、インテリセンスでサジェストできる
 */
export function dispatch<T extends AnyAction>(action: T): T;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
export function dispatch<T>(action: (d: typeof dispatch) => T): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dispatch(action: any) {
  return store.dispatch(action);
}
