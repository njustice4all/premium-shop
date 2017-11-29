import { Map } from 'immutable';

import * as actionTypes from '../actions/actionTypes';

const initialState = Map({
  address: false,
  selector: false,
});

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POP_ADDRESS:
      return state.set('address', !state.get('address'));
    case actionTypes.POP_SELECTOR:
      return state.set('selector', !state.get('selector'));
    default:
      return state;
  }
};
