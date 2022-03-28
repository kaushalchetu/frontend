import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  SET_USERS,
  FETCHING_USERS,
  SET_ROLE_OPTIONS,
  SET_USER
} from "../types";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import { toast } from 'react-toastify';

//User create code start
export const createUser = (data) => (dispatch) => {
  return AuthService.register(data).then(
    (response) => {
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
//User create code end

//Get all user roles code start
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
//Get all user roles code end

//Get all users code start
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
//Get all users code end

//Get user by id code start
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
//Get user by id code end

//User update code start
export const updateUser = (id, fields) => (dispatch) => {
  return UserService.updateUser(id, fields).then(
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
//User update code end

//User delete code start
export const deleteUser = id => (dispatch) => {
  return UserService.deleteUser(id).then(
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
//User delete code end

//User clear code start
export const clearUser = () => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: null,
  });
};
//User clear code end

//User status change code start
export const changeUserStatus = (id) => (dispatch) => {
  return UserService.changeUserStatus(id).then(
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
//User status change code end