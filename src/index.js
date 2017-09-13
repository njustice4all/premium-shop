import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './css/main.scss';
// import './css/main.css';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
