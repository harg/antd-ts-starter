import React from 'react';
import { observer, Provider } from 'mobx-react';

import { Button } from 'antd';

import { Todo, TodoStore, todoStore } from '../../stores/TodoStore';
import { TodoView } from './TodoView';
import { TodoCreateForm } from './TodoCreateForm';
import './TodoList.less';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface TodoListProps {
  store: TodoStore;
  todo?: Todo;
}

@observer
export class TodoList extends React.Component<TodoListProps, {}> {
  form: {} | null;
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.form as WrappedFormUtils;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.store.addTodo(values.task);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  render() {
    const store = this.props.store;
    return (
      <div className="TodoList">
        {store.report}
        <ul>
          {store.todos.map((todo, idx) => (
            <Provider todoStore={todoStore}>
              <TodoView
                todo={todo}
                key={idx}
                // store={this.props.store} // passing store as prop
                todoId={idx}
              />
            </Provider>
          ))}
        </ul>
        <Button type="primary" onClick={this.showModal}>
          New Todo
        </Button>
        <TodoCreateForm
          ref={(form) => {
            this.form = form;
          }}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
