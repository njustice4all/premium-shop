import * as actionTypes from './actionTypes';
import { apiAddress, apiLoadMoreAddress } from '../constants/api';

const reqAddress = query => ({ type: actionTypes.REQ_ADDRESS, query });
const reqAddressSuccess = result => ({ type: actionTypes.REQ_ADDRESS_SUCCESS, result });
const reqAddressFailure = error => ({ type: actionTypes.REQ_ADDRESS_FAILURE, error });

export const initRequestAddress = query => async dispatch => {
  dispatch(reqAddress(query));
  const response = await apiAddress(query);

  if (response.status >= 400) {
    dispatch(reqAddressFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(reqAddressSuccess(result.results));
  }
};

const reqLoadMore = () => ({ type: actionTypes.REQ_LOAD_MORE });
const reqLoadMoreSuccess = result => ({ type: actionTypes.REQ_LOAD_MORE_SUCCESS, result });
const reqLoadMoreFailure = error => ({ type: actionTypes.REQ_LOAD_MORE_FAILURE, error });

export const initRequestLoadMore = (query, page) => async dispatch => {
  dispatch(reqLoadMore());
  const response = await apiLoadMoreAddress(query, page);

  if (response.status >= 400) {
    dispatch(reqLoadMoreFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(reqLoadMoreSuccess(result.results));
  }
};

export const resetAddress = () => ({ type: actionTypes.RESET_ADDRESS });
