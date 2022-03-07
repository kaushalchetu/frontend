import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./users";
import roles from "./roles";
import reports from "./reports";

export default combineReducers({
  auth,
  message,
  users,
  roles,
  reports
});
