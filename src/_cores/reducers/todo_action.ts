import { dispatch } from '../../dispatch';
import { TodoActionType } from './todo_reducer';

const action = {
  add: (todo: Todo) => {
    dispatch({
      type: TodoActionType.ADD,
      todo,
    });
  },

  change: (todo: Todo) => {
    dispatch({
      type: TodoActionType.CHANGE,
      todo,
    });
  },
};

export {
  action as TodoAction,
};
