import * as actionTypes from './actionTypes';
import {
  apiAddShop,
  apiAddProducts,
  apiSetShop,
  apiSetProducts,
  apiGetProducts,
} from '../constants/api';

const addShop = () => ({ type: actionTypes.ADD_SHOP });

const addShopSuccess = result => ({ type: actionTypes.ADD_SHOP_SUCCESS, result });

const addShopFailure = result => ({ type: actionTypes.ADD_SHOP_FAILURE, result });

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

const addProducts = () => ({ type: actionTypes.ADD_PRODUCTS });

const addProductsSuccess = result => ({ type: actionTypes.ADD_PRODUCTS_SUCCESS, result });

const addProductsFailure = result => ({ type: actionTypes.ADD_PRODUCTS_FAILURE, result });

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

const setShop = () => ({ type: actionTypes.SET_SHOP });

const setShopSuccess = (result, shop) => ({ type: actionTypes.SET_SHOP_SUCCESS, result, shop });

const setShopFailure = result => ({ type: actionTypes.SET_SHOP_FAILURE, result });

export const initSetShop = shop => async dispatch => {
  dispatch(setShop());
  try {
    const response = await apiSetShop(shop);
    const result = await response.json();

    if (!result.msg) {
      dispatch(setShopFailure({ error: true }));
    } else {
      dispatch(setShopSuccess(result, shop));
    }
  } catch (error) {
    console.error('initSetShop error');
  }
};

export const addFranchise = franchise => ({
  type: actionTypes.ADD_FRANCHISE,
  franchise,
});

const getProducts = () => ({ type: actionTypes.GET_PRODUCTS });

const getProductsSuccess = result => ({ type: actionTypes.GET_PRODUCTS_SUCCESS, result });

const getProductsFailure = result => ({ type: actionTypes.GET_PRODUCTS_FAILURE, result });

export const initGetProducts = shopSequence => async dispatch => {
  dispatch(getProducts());
  try {
    const response = await apiGetProducts(shopSequence);
    const result = await response.json();

    if (!result.msg) {
      dispatch(getProductsFailure({ error: true }));
    } else {
      dispatch(getProductsSuccess(result));
      return { data: result.data };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const setProducts = () => ({ type: actionTypes.SET_PRODUCTS });

const setProductsSuccess = result => ({ type: actionTypes.SET_PRODUCTS_SUCCESS, result });

const setProductsFailure = result => ({ type: actionTypes.SET_PRODUCTS_FAILURE, result });

export const initSetProducts = products => async dispatch => {
  dispatch(setProducts());
  try {
    const response = await apiSetProducts(products);
    const result = await response.json();

    if (!result.msg) {
      dispatch(setProductsFailure({ error: true }));
    } else {
      dispatch(setProductsSuccess(result));
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
