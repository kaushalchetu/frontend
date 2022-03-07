import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_CHANGE_PASSWORD_MESSAGE,
  SET_FORGOT_PASSWORD_MESSAGE
} from "../types";

import AuthService from "../../services/auth.service";

//Register/User create code start
export const register = (data) => (dispatch) => {
  return AuthService.register(data).then(
    (response) => {
      //console.log(response)
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Register/User create code end

//Login code start
export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Login code end

//Password forgot code start
export const forgotPassword = (fields) => (dispatch) => {
  return AuthService.forgotPassword(fields).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Password forgot code end

//Password reset code start
export const resetPassword = (id, fields) => (dispatch) => {
  return AuthService.resetPassword(id, fields).then(
    (response) => {
      dispatch({
        type: SET_CHANGE_PASSWORD_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Password reset code end

//Profile update code start
export const updateProfile = (fields) => (dispatch) => {
  return AuthService.updateProfile(fields).then(
    (response) => {
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      const { data } = response.data

      const user = JSON.parse(localStorage.getItem("user"))
      const localStorageData = {
        ...user,
        user: data
      }
      localStorage.setItem("user", JSON.stringify(localStorageData));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Profile update code end

//Password change code start
export const changePassword = (fields) => (dispatch) => {
  return AuthService.changePassword(fields).then(
    (response) => {
      dispatch({
        type: SET_CHANGE_PASSWORD_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
//Password change code end

//Logout code start
export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
//Logout code end