import { Map, List } from 'immutable';

import * as actionTypes from '../actions/actionTypes';

const initialState = Map({
  status: Map({ isFetching: false, error: false }),
  addressList: List([]),
  page: Map({}),
  query: '',
});

export const address = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQ_ADDRESS:
      return state.set('query', action.query);
    case actionTypes.REQ_LOAD_MORE:
      return state.setIn(['status', 'isFetching'], true);
    case actionTypes.REQ_ADDRESS_SUCCESS:
      return state.withMutations(mutator =>
        mutator
          .set('addressList', List(action.result.juso))
          .setIn(['status', 'isFetching'], false)
          .set('page', action.result.common)
      );
    case actionTypes.REQ_LOAD_MORE_SUCCESS:
      return state.withMutations(mutator =>
        mutator
          .updateIn(['addressList'], list => list.push(...action.result.juso))
          .setIn(['status', 'isFetching'], false)
          .set('page', action.result.common)
      );
    case actionTypes.RESET_ADDRESS:
      return initialState;
    case actionTypes.REQ_ADDRESS_FAILURE:
    case actionTypes.REQ_LOAD_MORE_FAILURE:
      return state.setIn(['status', 'isFetching'], false);
    default:
      return state;
  }
};
