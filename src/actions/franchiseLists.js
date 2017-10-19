import * as actionTypes from './actionTypes';
import { apiGetShopLists } from '../constants/api';

const getShopLists = () => {
  return {
    type: actionTypes.GET_SHOP_LISTS,
  };
};

const getShopListsSuccess = result => {
  return {
    type: actionTypes.GET_SHOP_LISTS_SUCCESS,
    result,
  };
};

const getShopListsFailure = result => {
  return {
    type: actionTypes.GET_SHOP_LISTS_FAILURE,
    result,
  };
};

export const initGetShopLists = seq => async dispatch => {
  dispatch(getShopLists());
  const response = await apiGetShopLists(seq);
  const result = await response.json();

  if (!result.msg) {
    dispatch(getShopListsFailure({ error: true }));
  } else {
    dispatch(getShopListsSuccess(result));
  }
};
