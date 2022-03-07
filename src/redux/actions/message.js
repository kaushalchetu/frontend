import { SET_MESSAGE, CLEAR_MESSAGE, CLEAR_CHANGE_PASSWORD_MESSAGE } from "../types";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const clearChangePasswordMessage = () => ({
  type: CLEAR_CHANGE_PASSWORD_MESSAGE,
});
