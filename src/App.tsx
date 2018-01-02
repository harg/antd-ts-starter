import * as React from 'react';
import DevTools from 'mobx-react-devtools';
import './App.less';

import { TodoList } from './components/Todo/TodoList';
import { todoStore } from './stores/TodoStore';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <TodoList store={todoStore} />
        <DevTools />
      </div>
    );
  }
}

export default App;
