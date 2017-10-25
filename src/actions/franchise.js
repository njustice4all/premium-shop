import * as actionTypes from './actionTypes';
import { apiAddShop, apiAddProducts, apiSetShop } from '../constants/api';

const addShop = () => {
  return {
    type: actionTypes.ADD_SHOP,
  };
};

const addShopSuccess = result => {
  return {
    type: actionTypes.ADD_SHOP_SUCCESS,
    result,
  };
};

const addShopFailure = result => {
  return {
    type: actionTypes.ADD_SHOP_FAILURE,
    result,
  };
};

export const initAddShop = shop => async dispatch => {
  dispatch(addShop());
  const response = await apiAddShop(shop);

  if (response.status >= 400) {
    dispatch(addShopFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(addShopSuccess(result));
  }
};

const addProducts = () => {
  return {
    type: actionTypes.ADD_PRODUCTS,
  };
};

const addProductsSuccess = result => {
  return {
    type: actionTypes.ADD_PRODUCTS_SUCCESS,
    result,
  };
};

const addProductsFailure = result => {
  return {
    type: actionTypes.ADD_PRODUCTS_FAILURE,
    result,
  };
};

export const initAddProducts = products => async dispatch => {
  dispatch(addProducts());
  const response = await apiAddProducts(products);
  const result = await response.json();

  if (!result.msg) {
    dispatch(addProductsFailure({ error: true }));
    return { error: true };
  } else {
    dispatch(addProductsSuccess(products));
    return { error: false };
  }
};

const setShop = () => ({
  type: actionTypes.SET_SHOP,
});

const setShopSuccess = result => ({
  type: actionTypes.SET_SHOP_SUCCESS,
  result,
});

const setShopFailure = result => ({
  type: actionTypes.SET_SHOP_FAILURE,
  result,
});

export const initSetShop = shop => async dispatch => {
  dispatch(setShop());
  try {
    const response = await apiSetShop(shop);
    const result = await response.json();

    if (!result.msg) {
      dispatch(setShopFailure({ error: true }));
    } else {
      dispatch(setShopSuccess(result));
    }
  } catch (error) {
    console.error('initSetShop error');
  }
};

export const addShopSequence = shopSequence => ({
  type: actionTypes.ADD_SHOP_SEQUENCE,
  shopSequence,
});
