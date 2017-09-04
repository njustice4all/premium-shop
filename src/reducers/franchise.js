import assign from 'lodash/assign';
import * as actionTypes from '../actions/actionTypes';

const initFranchise = {
  status: {
    isFetching: false,
    errorMessage: null,
  },
  shop: {
    images: [],
    category: '',
    name: '',
    description: '',
    address: {},
    contact: '',
    openingHours: '',
    closedDays: '',
    possible: [], // 홀, 배달, 포장, 예약, 주차
  },
  products: [], // { image: '', title: '', price: 0 }
};

export const franchise = (state = initFranchise, action) => {
  switch (action.type) {
    case actionTypes.ADD_SHOP:
    case actionTypes.ADD_PRODUCTS:
    case actionTypes.REQ_UPLOAD:
      return assign({}, state, {
        status: {
          isFetching: true,
          errorMessage: state.status.errorMessage,
        }
      });
    case actionTypes.ADD_SHOP_SUCCESS:
      return assign({}, state, {
        status: {
          isFetching: false,
          errorMessage: state.status.errorMessage,
        },
        shop: {
          images: [...state.shop.images],
          ...action.shop,
        },
      });
    case actionTypes.ADD_PRODUCTS_SUCCESS:
      return assign({}, state, {
        status: {
          isFetching: false,
          errorMessage: state.status.errorMessage,
        },
        products: [...state.products, ...action.products],
      });
    // case actionTypes.REQ_UPLOAD_SUCCESS:
    //   return assign({}, state, {
    //     status: {
    //       isFetching: false,
    //       errorMessage: state.status.errorMessage,
    //     },
    //   });
    case actionTypes.ADD_SHOP_FAILURE:
    case actionTypes.ADD_PRODUCTS_FAILURE:
    case actionTypes.REQ_UPLOAD_FAILURE:
      return assign({}, state, {
        status: {
          isFetching: false,
          errorMessage: state.status.errorMessage,
        },
      });
    default:
      return state;
  }
};
