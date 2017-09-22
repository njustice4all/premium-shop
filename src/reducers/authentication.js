import assign from 'lodash/assign';
import * as actionTypes from '../actions/actionTypes';

const initAuth = {
  isLogin: false,
  status: {
    isFetching: false,
    error: false,
  },
};

export const authentication = (state = initAuth, action) => {
  switch (action.type) {
    case actionTypes.REQ_SIGNIN:
    case actionTypes.REQ_SIGNUP:
      return assign({}, state, {
        status: {
          isFetching: true,
          error: state.status.error,
        },
      });
    case actionTypes.REQ_SIGNIN_SUCCESS:
      return assign({}, state, {
        isLogin: true,
        seq: action.result.seq,
        status: {
          isFetching: false,
          error: state.status.error,
        },
      });
    case actionTypes.REQ_SIGNUP_SUCCESS:
      return assign({}, state, {
        isLogin: true,
        seq: action.result.seq,
        status: {
          isFetching: false,
          error: state.status.error,
        },
      });
    case actionTypes.REQ_SIGNIN_FAILURE:
    case actionTypes.REQ_SIGNUP_FAILURE:
      return assign({}, state, {
        status: {
          isFetching: false,
          error: action.result.error,
        },
      });
    default:
      return state;
  }
};
