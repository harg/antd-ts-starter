import React from 'react';
import { inject, observer } from 'mobx-react';

import { Checkbox } from 'antd';

import { Todo, TodoStore } from '../../stores/TodoStore';

interface TodoViewProps {
  todoStore?: TodoStore;
  todo: Todo;
  todoId: number;
}

@inject('todoStore')
@observer
export class TodoView extends React.Component<TodoViewProps, {}> {
  render() {
    const todo = this.props.todo;
    return (
      <li>
        <Checkbox
          checked={todo.completed}
          onChange={(e) => this.onToggleCompleted(this.props.todoId)}
        >
          {todo.task}
        </Checkbox>
        &nbsp;&nbsp;
        <small>
          <a onClick={(e) => this.onRename(this.props.todoId)}>Edit</a>
          &nbsp;|&nbsp;
          <a onClick={(e) => this.onRemove(this.props.todoId)}>Remove</a>
        </small>
      </li>
    );
  }

  onToggleCompleted = (idx: number) => {
    const todo = this.props.todo;
    this.props.todoStore!.updateTodo(idx, { completed: !todo.completed });
  };

  onRename = (idx: number) => {
    const todo = this.props.todo;
    const task = prompt('Task name', String(todo.task)) || todo.task;
    this.props.todoStore!.updateTodo(idx, { task: task });
  };

  onRemove = (idx: number) => {
    this.props.todoStore!.removeTodo(idx);
  };
}
