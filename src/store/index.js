import { createStore, applyMiddleware } from 'redux';
import { reducers } from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
