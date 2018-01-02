import { autorun, observable, computed, action } from 'mobx';

export interface Todo {
  task: string | null | undefined;
  completed: boolean;
}

export class TodoStore {
  @observable todos: Todo[] = [];

  constructor() {
    autorun(() => console.log(this.report));
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  @computed
  get nextTodo() {
    return this.todos.find((todo) => todo.completed !== true);
  }

  @computed
  get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    return (
      `Next todo: "${this.nextTodo ? this.nextTodo.task : ''}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  @action
  addTodo(task: string | null) {
    this.todos.push({ task: task, completed: false });
  }

  @action
  updateTodo(idx: number, obj: {}) {
    if (idx >= 0) {
      Object.assign(this.todos[idx], obj);
    }
  }

  @action
  removeTodo(idx: number) {
    if (idx >= 0 && idx <= this.todos.length) {
      this.todos.splice(idx, 1);
    }
  }
}

export const todoStore = new TodoStore();
