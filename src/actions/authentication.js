import * as actionTypes from './actionTypes';

const reqSignin = () => {
  return {
    type: actionTypes.REQ_SIGNIN
  };
};

const reqSigninSuccess = (result) => {
  return {
    type: actionTypes.REQ_SIGNIN_SUCCESS,
    result
  };
};

const reqSigninFailure = (result) => {
  return {
    type: actionTypes.REQ_SIGNIN_FAILURE,
    result
  };
};

export const initSignin = (id, password) => async (dispatch) => {
  dispatch(reqSignin());
  // api request here

  if ('failure?') {
    dispatch(reqSigninFailure('failure'));
  } else {
    dispatch(reqSigninSuccess('success'));
  }
};

const reqSignup = () => {
  return {
    type: actionTypes.REQ_SIGNUP
  };
};

const reqSignupSuccess = (result) => {
  return {
    type: actionTypes.REQ_SIGNUP_SUCCESS,
    result
  };
};

const reqSignupFailure = (result) => {
  return {
    type: actionTypes.REQ_SIGNUP_FAILURE,
    result
  };
};

export const initSignup = (id, password) => async (dispatch) => {
  dispatch(reqSignup());
  // api request here

  if ('failure?') {
    dispatch(reqSignupFailure('failure'));
  } else {
    dispatch(reqSignupSuccess('success'));
  }
};
