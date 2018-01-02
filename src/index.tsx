import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.less';
import 'assets/styles/main.less';

import { useStrict } from 'mobx';
useStrict(true);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
