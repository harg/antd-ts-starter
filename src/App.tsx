import * as React from 'react';
import './App.less';
import { Button } from 'antd';

class App extends React.Component<{}, {}> {
  handleClick = (txt: string) => {
    console.log(txt);
    alert(txt);
  };

  render() {
    const hello = 'Hello world!';
    return (
      <div className="App">
        <Button type="primary" onClick={(e) => this.handleClick(hello)}>
          {hello}
        </Button>
      </div>
    );
  }
}

export default App;
