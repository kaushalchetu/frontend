import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import rundataReports from "./rundataReports";
import sicReports from "./sicReports";

export default combineReducers({
  auth,
  users,
  roles,
  rundataReports,
  sicReports
});
