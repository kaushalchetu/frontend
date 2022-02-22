import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./users";
import roles from "./roles";

export default combineReducers({
  auth,
  message,
  users,
  roles
});
