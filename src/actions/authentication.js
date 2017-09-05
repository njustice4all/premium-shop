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

/**
 * user: { id, password }
 */
export const initSignin = (user) => async (dispatch) => {
  dispatch(reqSignin());
  // api request here

  if (false) {
    dispatch(reqSigninFailure('failure'));
  } else {
    dispatch(reqSigninSuccess('success'));
    return true;
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

/**
 * user: { id, password }
 */
export const initSignup = (user) => async (dispatch) => {
  dispatch(reqSignup());
  // api request here

  if ('failure?') {
    dispatch(reqSignupFailure('failure'));
  } else {
    dispatch(reqSignupSuccess('success'));
  }
};
