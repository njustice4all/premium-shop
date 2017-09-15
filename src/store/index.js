// @flow

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

const middlewares = [thunk];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(createLogger());
}

export default createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
