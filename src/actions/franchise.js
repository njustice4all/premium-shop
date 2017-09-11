import * as actionTypes from './actionTypes';
import { apiAddProducts } from '../constants/api';

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

  if (false) {
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
  const data = new FormData();
  data.append('products', products);
  // data.append('products', JSON.stringify(products));
  const response = await apiAddProducts(data);

  if (response.status >= 400) {
    dispatch(addProductsFailure(response.statusText));
  } else {
    dispatch(addProductsSuccess('success', products));
  }
};
