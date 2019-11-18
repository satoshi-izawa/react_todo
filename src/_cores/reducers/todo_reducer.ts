import produce from 'immer';
import { TodoModel } from '../models/todo_model';

class Type {
  static readonly ADD = Symbol('ADD');
  static readonly CHANGE = Symbol('CHANGE');
}

function createInitialState() {
  return {
    todos: [] as TodoModel[],
  };
}

const reducer = (state = createInitialState(), action: Action) => produce(state, draft => {
  switch (action.type) {
    case Type.ADD: {
      const todo = new TodoModel();
      todo.update(action.todo);
      draft.todos.push(todo);
      break;
    }
    case Type.CHANGE: {
      const todo = draft.todos.find(t => t.id === action.todo.id);
      todo?.update(action.todo);
      break;
    }
  }
});

interface Actions {
  [Type.ADD]: {
    todo: Todo;
  };
  [Type.CHANGE]: {
    todo: Todo;
  };
}

type Action = ActionTypeCreator<Actions>;

export {
  reducer as TodoReducer,
  Type as TodoActionType,
};
