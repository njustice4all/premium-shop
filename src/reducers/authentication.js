import assign from 'lodash/assign';
import * as actionTypes from '../actions/actionTypes';

const initAuth = {
  isLogin: false,
  status: {
    isFetching: false,
    errorMessage: null,
  },
};

export const authentication = (state = initAuth, action) => {
  switch (action.type) {
    case actionTypes.REQ_SIGNIN:
    case actionTypes.REQ_SIGNUP:
      return assign({}, state, {
        status: {
          isFetching: true,
          errorMessage: state.status.errorMessage
        }
      });
    case actionTypes.REQ_SIGNIN_SUCCESS:
      return assign({}, state, {
        isLogin: true,
        status: {
          isFetching: false,
          errorMessage: state.status.errorMessage,
        }
      });
    // case actionTypes.REQ_SIGNUP_SUCCESS:
    //   return assign({}, state, {
    //     status: {
    //       isFetching: false,
    //       errorMessage: state.status.errorMessage,
    //     }
    //   });
    case actionTypes.REQ_SIGNIN_FAILURE:
    case actionTypes.REQ_SIGNUP_FAILURE:
      return assign({}, state, {
        status: {
          isFetching: false,
          errorMessage: state.status.errorMessage,
        }
      });
    default:
      return state;
  }
};
