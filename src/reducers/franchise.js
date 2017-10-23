import { Map, List } from 'immutable';

import * as actionTypes from '../actions/actionTypes';

const initialState = Map({
  seq: '',
  status: Map({
    isFetching: false,
    error: false,
    addShop: false,
    addProducts: false,
  }),
  shop: Map({
    images: List([]),
    category: '',
    name: '',
    description: '',
    address: Map({
      zipCode: '',
      firstAddress: '',
      detailAddress: '',
    }),
    contact: '',
    openingHours: '',
    closedDays: '',
    possible: List([]),
  }),
  products: List([]),
});

export const franchise = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SHOP:
    case actionTypes.ADD_PRODUCTS:
    case actionTypes.REQ_UPLOAD:
      return state.setIn(['status', 'isFetching'], true);
    case actionTypes.ADD_SHOP_SUCCESS:
      return state
        .set('seq', action.result.seq)
        .mergeIn(['status'], { isFetching: false, error: false, addShop: true })
        .set('shop', List(action.shop));
    case actionTypes.ADD_PRODUCTS_SUCCESS:
      return state
        .mergeIn(['status'], { isFetching: false, error: false, addShop: true })
        .set('products', List(action.result.products));
    case actionTypes.ADD_SHOP_FAILURE:
    case actionTypes.ADD_PRODUCTS_FAILURE:
    case actionTypes.REQ_UPLOAD_FAILURE:
      return state.mergeIn(['status'], { isFetching: false, error: action.result.error });
    default:
      return state;
  }
};
