import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  SET_USERS,
  FETCHING_USERS,
  SET_ROLE_OPTIONS,
  SET_USER
} from "../types";

import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

export const createUser = (data) => (dispatch) => {
  return AuthService.register(data).then(
    (response) => {
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

export const getAllRolesOptions = () => (dispatch) => {
  dispatch({
    type: FETCHING_USERS,
    payload: true,
  });
  return UserService.getActiveRoles().then(
    (response) => {
      if (response.data.data) {
        dispatch({
          type: SET_ROLE_OPTIONS,
          payload: response.data.data,
        });

        dispatch({
          type: FETCHING_USERS,
          payload: false,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: FETCHING_USERS,
        payload: false,
      });
      return Promise.reject();

    }
  );

}

export const getAllUsers = () => (dispatch) => {
  dispatch({
    type: FETCHING_USERS,
    payload: true,
  });
  return UserService.getAllUsers().then(
    (response) => {
      if (response.data.users) {
        dispatch({
          type: GET_USERS_SUCCESS,
        });

        dispatch({
          type: SET_USERS,
          payload: response.data.users,
        });

        dispatch({
          type: FETCHING_USERS,
          payload: false,
        });
      }

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
        type: GET_USERS_FAIL,
      });

      dispatch({
        type: FETCHING_USERS,
        payload: false,
      });

      return Promise.reject();
    }
  );
};

export const getUser = id => (dispatch) => {
  dispatch({
    type: FETCHING_USERS,
    payload: true,
  });
  return UserService.getUserById(id).then(
    (response) => {
      if (response.data.data) {
        dispatch({
          type: GET_USERS_SUCCESS,
        });

        dispatch({
          type: SET_USER,
          payload: response.data.data,
        });

        dispatch({
          type: FETCHING_USERS,
          payload: false,
        });
      }

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
        type: GET_USERS_FAIL,
      });

      dispatch({
        type: FETCHING_USERS,
        payload: false,
      });

      return Promise.reject();
    }
  );
};

export const updateUser = (id, fields) => (dispatch) => {
  return UserService.updateUser(id, fields).then(
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

export const deleteUser = id => (dispatch) => {
  return UserService.deleteUser(id).then(
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

export const clearUser = () => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: null,
  });
};

export const changeUserStatus = (id) => (dispatch) => {
  return UserService.changeUserStatus(id).then(
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