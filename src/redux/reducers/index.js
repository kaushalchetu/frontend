import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import users from "./users";
import roles from "./roles";
import rundataReports from "./rundataReports";
import sicReports from "./sicReports";

export default combineReducers({
  auth,
  message,
  users,
  roles,
  rundataReports,
  sicReports
});
