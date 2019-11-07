import { dispatch } from '../../dispatch';
import { TodoActionType } from './todo_reducer';

const action = {
  add: (todo: Todo) => {
    dispatch({
      type: TodoActionType.ADD,
      todo,
    });
  },
};

export {
  action as TodoAction,
};
