import { Map } from 'immutable';

import * as actionTypes from '../actions/actionTypes';

const initialState = Map({
  isLogin: false,
  seq: '',
  status: Map({
    isFetching: false,
    error: false,
  }),
});

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTOLOGIN:
      return state.merge({ isLogin: true, seq: action.userInfo.memberSequence });
    case actionTypes.REQ_SIGNIN:
    case actionTypes.REQ_SIGNUP:
      return state.setIn(['status', 'isFetching'], true);
    case actionTypes.REQ_SIGNIN_SUCCESS:
    case actionTypes.REQ_SIGNUP_SUCCESS:
      return state
        .merge({ isLogin: true, seq: action.result.seq })
        .setIn(['status', 'isFetching'], false);
    case actionTypes.REQ_SIGNIN_FAILURE:
    case actionTypes.REQ_SIGNUP_FAILURE:
      return state.set('status', Map({ isFetching: false, error: action.result.error }));
    default:
      return state;
  }
};
