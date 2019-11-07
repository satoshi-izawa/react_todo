/* eslint-disable @typescript-eslint/no-explicit-any */
import { immerable } from 'immer';

export class TodoModel implements Todo {
  [immerable] = true;

  id = 0;
  task = '';
  description = '';
  limit = '';

  public update(todo: Partial<Todo>) {
    (Object.keys(todo) as (keyof Todo)[]).forEach(k => {
      (this as any)[k] = todo[k];
    });
  }
}
