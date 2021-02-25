import * as actionTypes from './actionTypes';
import * as global from './../../global';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem(global.TOKEN);
  localStorage.removeItem(global.EXPIRATION_DATE);
  localStorage.removeItem(global.USER_ID);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem(global.TOKEN, response.data.idToken);
        localStorage.setItem(global.EXPIRATION_DATE, expirationDate);
        localStorage.setItem(global.USER_ID, response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        console.log(response.data.expiresIn * 1000);
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath: path,
  };
};

export const authCheckSate = () => {
  return (dispatch) => {
    const token = localStorage.getItem(global.TOKEN);
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem(global.EXPIRATION_DATE)
      );
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem(global.USER_ID);
        dispatch(authSuccess(token, userId));
        console.log(expirationDate.getTime() - new Date().getTime());

        dispatch(
          checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};
