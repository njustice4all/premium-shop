import { Map, List } from 'immutable';

import * as actionTypes from '../actions/actionTypes';

const initialState = Map({
  status: Map({
    isFetching: false,
    error: false,
  }),
  lists: List([]),
});

export const franchiseLists = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SHOP_LISTS:
      return state.setIn(['status', 'isFetching'], true);
    case actionTypes.GET_SHOP_LISTS_SUCCESS:
      return state.withMutations(mutator =>
        mutator.setIn(['status', 'isFetching'], false).set('lists', List(action.result.data))
      );
    case actionTypes.GET_SHOP_LISTS_FAILURE:
      return state.mergeIn(['status', { isFetching: false, error: action.result.error }]);
    default:
      return state;
  }
};
