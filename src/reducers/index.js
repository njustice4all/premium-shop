import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { franchise } from './franchise';
import location from './location';

export default combineReducers({
  authentication,
  franchise,
  location,
});
