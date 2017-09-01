import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { franchise } from './franchise';

export const reducers = combineReducers({
  authentication,
  franchise,
});