import * as actionTypes from './actionTypes';

const reqUpload = () => {
  return {
    type: actionTypes.REQ_UPLOAD,
  };
};

const reqUploadSuccess = result => {
  return {
    type: actionTypes.REQ_UPLOAD_SUCCESS,
    result,
  };
};

const reqUploadFailure = result => {
  return {
    type: actionTypes.REQ_UPLOAD_FAILURE,
    result,
  };
};

export const initUpload = () => async dispatch => {
  dispatch(reqUpload());
  // api request here

  if ('failure?') {
    dispatch(reqUploadFailure('failure'));
  } else {
    dispatch(reqUploadSuccess('success'));
  }
};
