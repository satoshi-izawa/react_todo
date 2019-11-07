import produce from 'immer';
import { TodoModel } from '../models/todo_model';

class Type {
  static readonly ADD = Symbol('ADD');
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
    }
  }
});

interface Actions {
  [Type.ADD]: {
    todo: Todo;
  };
}

type Action = ActionTypeCreator<Actions>;

export {
  reducer as TodoReducer,
  Type as TodoActionType,
};
