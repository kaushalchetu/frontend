import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../helpers/Constant";

//const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Get all users API code start
const getAllUsers = () => {
  return axios.get(API_URL + "users",
    {
      headers: authHeader(),
    })
};
//Get all users API code end

//Get user by id API code start
const getUserById = (id) => {
  return axios.get(API_URL + "user/" + id,
    {
      headers: authHeader(),
    })
};
//Get user by id API code end

//User update API code start
const updateUser = (id, fields) => {
  return axios.put(API_URL + "update/user/" + id, fields,
    {
      headers: authHeader(),
    })
};
//User update API code end

//Get all active roles API code start
const getActiveRoles = () => {
  return axios.get(API_URL + "active/roles",
    {
      headers: authHeader(),
    })
};
//Get all active roles API code end

//User delete API code start
const deleteUser = (id) => {
  return axios.delete(API_URL + "delete/user/" + id,
    {
      headers: authHeader(),
    })
};
//User delete API code end

//USer status change active(1)/inactive(0) API code start
const changeUserStatus = (id) => {
  return axios.get(API_URL + "change/user/status/" + id,
  {
      headers: authHeader(),
  })
};
//USer status change active(1)/inactive(0) API code end

export default {
  getAllUsers,
  getUserById,
  updateUser,
  getActiveRoles,
  deleteUser,
  changeUserStatus
};