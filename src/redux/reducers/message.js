import { SET_MESSAGE, CLEAR_MESSAGE } from "../types";

const initialState = {
  message: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: null };

    default:
      return state;
  }
}
