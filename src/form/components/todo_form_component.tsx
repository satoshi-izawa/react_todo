import React from 'react';
import { ComponentMixProps, convertToFC } from '../../_cores/bases/init_component';
import { TodoModel } from '../../_cores/models/todo_model';
import { TextInput } from '../../_commons/inputs/text_input';

interface Props {
  todo: TodoModel | null;
}

class ComponentClass {
  private _task = TextInput.new();
  private _description = TextInput.new();

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
          <this._task.toJSX
            value={todo?.task}
          />
        </div>
        <div>
          <this._description.toJSX
            value={todo?.description}
          />
        </div>
      </div>
    ), [todo]);
  }
}

interface ComponentClass extends ComponentMixProps<Props, ComponentClass> { }
export const TodoFormComponent = convertToFC(ComponentClass);
