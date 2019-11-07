import { connect } from 'react-redux';
import React from 'react';
import { ComponentMixProps, convertToFC } from '../../_cores/bases/init_component';
import { Reducers } from '../../store';
import { TodoFormComponent } from '../components/todo_form_component';
import { TodoAction } from '../../_cores/reducers/todo_action';

const distributeState = ({ Todo }: Reducers) => ({ Todo });
type Props = ReturnType<typeof distributeState>;

class ContainerClass {
  public render() {
    const { todos } = this.props.Todo;
    return React.useMemo(() => (
      <div>
        {todos.map(t => (
          <TodoFormComponent
            key={t.id}
            todo={t}
          />
        ))}
        <div onClick={this.onClick}>
          add
        </div>
      </div>
    ), [todos]);
  }

  private onClick = () => {
    TodoAction.add({
      id: 1,
      task: 'test',
      description: 'test',
      limit: '',
    });
  }
}


interface ContainerClass extends ComponentMixProps<Props, ContainerClass> { }

export const TodoListContainer = connect(distributeState)(convertToFC(ContainerClass));
