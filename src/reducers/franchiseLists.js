import assign from 'lodash/assign';
import * as actionTypes from '../actions/actionTypes';

const initFranchiseLists = {
  status: {
    isFetching: false,
    error: false,
  },
  lists: [],
};

export const franchiseLists = (state = initFranchiseLists, action) => {
  switch (action.type) {
    case actionTypes.GET_SHOP_LISTS:
      return assign({}, state, {
        status: {
          isFetching: true,
          error: state.status.error,
        },
      });
    case actionTypes.GET_SHOP_LISTS_SUCCESS:
      return {
        ...initFranchiseLists,
        lists: action.result.data
      }
    case actionTypes.GET_SHOP_LISTS_FAILURE:
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
