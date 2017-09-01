import * as actionTypes from './actionTypes';

const addShop = () => {
  return {
    type: actionTypes.ADD_SHOP
  };
};

const addShopSuccess = (result, shop) => {
  return {
    type: actionTypes.ADD_SHOP_SUCCESS,
    result,
    shop
  };
};

const addShopFailure = (result) => {
  return {
    type: actionTypes.ADD_SHOP_FAILURE,
    result
  };
};

export const initAddShop = (shop) => async (dispatch) => {
  dispatch(addShop());
  // api request here

  if ('failure?') {
    dispatch(addShopFailure('failure'));
  } else {
    dispatch(addShopSuccess('success', shop));
  }
};

const addProducts = () => {
  return {
    type: actionTypes.ADD_PRODUCTS
  };
};

const addProductsSuccess = (result, products) => {
  return {
    type: actionTypes.ADD_PRODUCTS_SUCCESS,
    result,
    products
  };
};

const addProductsFailure = (result) => {
  return {
    type: actionTypes.ADD_PRODUCTS_FAILURE,
    result
  };
};

export const initAddProducts = (products) => async (dispatch) => {
  dispatch(addProducts());
  // api request here

  if ('failure?') {
    dispatch(addProductsFailure('failure'));
  } else {
    dispatch(addProductsSuccess('success', products));
  }
};
