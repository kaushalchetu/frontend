import { SET_MESSAGE, CLEAR_MESSAGE, SET_CHANGE_PASSWORD_MESSAGE, CLEAR_CHANGE_PASSWORD_MESSAGE } from "../types";

const initialState = {
  message: null,
  changePasswordMessage: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: payload
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      };

    case SET_CHANGE_PASSWORD_MESSAGE:
      return {
        ...state,
        changePasswordMessage: payload
      };

    case CLEAR_CHANGE_PASSWORD_MESSAGE:
      return {
        ...state,
        changePasswordMessage: null
      };



    default:
      return state;
  }
}
