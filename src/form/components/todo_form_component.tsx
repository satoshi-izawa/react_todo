import React from 'react';
import { ComponentMixProps, convertToFC } from '../../_cores/bases/init_component';
import { TodoModel } from '../../_cores/models/todo_model';

interface Props {
  todo: TodoModel | null;
}

class ComponentClass {
  public defaultProps() {
    return {
      todo: null,
    };
  }

  public render() {
    const { todo } = this.props;
    return React.useMemo(() => (
      <div>
        <div>
          {todo?.task ?? '-'}
        </div>
        <div>
          {todo?.description ?? '-'}
        </div>
      </div>
    ), [todo]);
  }
}

interface ComponentClass extends ComponentMixProps<Props, ComponentClass> { }
export const TodoFormComponent = convertToFC(ComponentClass);
