import * as actionTypes from './actionTypes';
import { apiSignin, apiSignup } from '../constants/api';

const reqSignin = () => {
  return {
    type: actionTypes.REQ_SIGNIN,
  };
};

const reqSigninSuccess = result => {
  return {
    type: actionTypes.REQ_SIGNIN_SUCCESS,
    result,
  };
};

const reqSigninFailure = result => {
  return {
    type: actionTypes.REQ_SIGNIN_FAILURE,
    result,
  };
};

/**
 * user: { id, password }
 */
export const initSignin = user => async dispatch => {
  dispatch(reqSignin());
  const response = await apiSignin(user);
  const result = await response.json();

  if (!result.msg) {
    dispatch(reqSigninFailure({ error: true }));
    return { memberSequence: '' };
  } else {
    dispatch(reqSigninSuccess(result));
    return { memberSequence: result.seq };
  }
};

const reqSignup = () => {
  return {
    type: actionTypes.REQ_SIGNUP,
  };
};

const reqSignupSuccess = result => {
  return {
    type: actionTypes.REQ_SIGNUP_SUCCESS,
    result,
  };
};

const reqSignupFailure = result => {
  return {
    type: actionTypes.REQ_SIGNUP_FAILURE,
    result,
  };
};

/**
 * user: { id, password }
 */
export const initSignup = user => async dispatch => {
  dispatch(reqSignup());
  const response = await apiSignup(user);

  if (response.status >= 400) {
    dispatch(reqSignupFailure({ error: true }));
  } else {
    const result = await response.json();
    dispatch(reqSignupSuccess(result));
    return true;
  }
};

export const autoLogin = userInfo => async dispatch => {
  dispatch({ type: actionTypes.AUTOLOGIN, userInfo });
};
