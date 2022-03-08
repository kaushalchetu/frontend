import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../helpers/Constant";

//const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Register/User create API code start
 const register = (fields) => {
  return axios.post(API_URL + "create/user", fields,
    {
      headers: authHeader(),
    })
};
//Register/User create API code end

//Login API code start
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};
//Login API code end

//Password forgot API code start
const forgotPassword = (fields) => {
  return axios.post(API_URL + "forgot/password", fields,
    {
      headers: authHeader(),
    })
};
//Password forgot API code end

//Password reset API code start
const resetPassword = (id, fields) => {
  return axios.post(API_URL + "reset/password/" + id, fields,
    {
      headers: authHeader(),
    })
};
//Password reset API code end

//Profile update API code start
const updateProfile = (fields) => {
  return axios.post(API_URL + "update/user/profile", fields,
    {
      headers: authHeader(),
    })
};
//Profile update API code end

//Password change API code start
const changePassword = (fields) => {
  return axios.post(API_URL + "change/password", fields,
    {
      headers: authHeader(),
    })
};
//Password change API code end

//Logout API code start
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
//Logout API code end

export default {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
  logout
};
