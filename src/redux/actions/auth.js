import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";
import AuthService from "../../services/auth.service";
import { toast } from 'react-toastify';

//Register/User create code start
export const register = (data) => (dispatch) => {
  return AuthService.register(data).then(
    (response) => {
      //console.log(response)
      dispatch({
        type: REGISTER_SUCCESS,
      });
      toast.success(response.data.message, {
        theme: "colored"
      })
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
      toast.error(message, {
        theme: "colored"
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
      toast.error(message, {
        theme: "colored"
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
      toast.success(response.data.message, {
        theme: "colored"
      })
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        toast.error(message, {
          theme: "colored"
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
      toast.success(response.data.message, {
        theme: "colored"
      })
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        toast.error(message, {
          theme: "colored"
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
      toast.success(response.data.message, {
        theme: "colored"
      })
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

        toast.error(message, {
          theme: "colored"
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
      toast.success(response.data.message, {
        theme: "colored"
      })
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

        toast.error(message, {
          theme: "colored"
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