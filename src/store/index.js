import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { reducers } from '../reducers/index';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
