import * as actionTypes from './actionTypes';
import { apiAddShop, apiAddProducts } from '../constants/api';

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
  const data = new FormData();
  data.append('shop', shop);
  const response = await apiAddProducts(data);

  if (response.status >= 400) {
    dispatch(addShopFailure(response.statusText));
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
  // const response = await apiAddProducts(products);

  if (false) {
    // dispatch(addProductsFailure(response.statusText));
  } else {
    dispatch(addProductsSuccess('success', products));
  }
};
