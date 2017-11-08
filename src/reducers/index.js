import { combineReducers } from 'redux-immutable';

import { authentication } from './authentication';
import { franchise } from './franchise';
import { franchiseLists } from './franchiseLists';
import { address } from './address';
import { ui } from './ui';
import location from './location';

export default combineReducers({
  authentication,
  franchise,
  franchiseLists,
  address,
  ui,
  location,
});
