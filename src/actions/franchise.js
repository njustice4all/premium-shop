import * as actionTypes from './actionTypes';

const addShop = () => {
  return {
    type: actionTypes.ADD_SHOP
  };
};

const addShopSuccess = (result) => {
  return {
    type: actionTypes.ADD_SHOP_SUCCESS,
    result
  };
};

const addShopFailure = (result) => {
  return {
    type: actionTypes.ADD_SHOP_FAILURE,
    result
  };
};

export const initAddShop = () => async (dispatch) => {
  dispatch(addShop());
  // api request here

  if ('failure?') {
    dispatch(addShopFailure('failure'));
  } else {
    dispatch(addShopSuccess('success'));
  }
};

const addProducts = () => {
  return {
    type: actionTypes.ADD_PRODUCTS
  };
};

const addProductsSuccess = (result) => {
  return {
    type: actionTypes.ADD_PRODUCTS_SUCCESS,
    result
  };
};

const addProductsFailure = (result) => {
  return {
    type: actionTypes.ADD_PRODUCTS_FAILURE,
    result
  };
};

export const initAddProducts = () => async (dispatch) => {
  dispatch(addProducts());
  // api request here

  if ('failure?') {
    dispatch(addProductsFailure('failure'));
  } else {
    dispatch(addProductsSuccess('success'));
  }
};
