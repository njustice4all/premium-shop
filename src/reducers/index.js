import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { franchise } from './franchise';

export default combineReducers({
  authentication,
  franchise,
});
