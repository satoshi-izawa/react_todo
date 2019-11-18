import React from 'react';
import { ComponentMixProps, convertToFC } from '../../_cores/bases/init_component';
import { TodoModel } from '../../_cores/models/todo_model';
import { TextInput } from '../../_commons/inputs/text_input';
import { ButtonInput } from '../../_commons/inputs/button_input';
import { TodoAction } from '../../_cores/reducers/todo_action';

const style = require('./todo_form_component.scss');

interface Props {
  todo: TodoModel;
}

class ComponentClass {
  private _task = TextInput.new();
  private _description = TextInput.new();

  public render() {
    const { todo } = this.props;
    console.log(todo);
    return React.useMemo(() => (
      <div className={style.root}>
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
        <ButtonInput
          onClick={this.onClick}
          value="保存"
        />
      </div>
    ), [todo]);
  }

  private onClick = () => {
    const { todo } = this.props;
    TodoAction.change({
      id: todo.id,
      limit: todo.limit,
      task: this._task.getValue(),
      description: this._description.getValue(),
    });
  }
}

interface ComponentClass extends ComponentMixProps<Props, ComponentClass> { }
export const TodoFormComponent = convertToFC(ComponentClass);
