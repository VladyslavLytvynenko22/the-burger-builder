import * as actionTypes from './actionTypes';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK6aGD7oa1wZBtIcKcfGjsPRgZ8KDLWjo'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK6aGD7oa1wZBtIcKcfGjsPRgZ8KDLWjo';
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
