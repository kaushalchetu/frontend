import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  SET_USERS,
  FETCHING_USERS,
  SET_USER,
  SET_ROLE_OPTIONS
} from "../types";

const initialState = {
  users: [],
  user: null,
  isFetching: false,
  roleOptions: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        success: false,
      };
    case FETCHING_USERS:
      return {
        ...state,
        isFetching: payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: payload,
      };

    case SET_USER:
      return {
        ...state,
        user: payload,
      };

    case SET_ROLE_OPTIONS:
      return {
        ...state,
        roleOptions: payload,
      };
    default:
      return state;
  }
}
