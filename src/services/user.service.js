import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/";

const getAllUsers = () => {
  return axios.get(API_URL + "get-all-users",
    {
      headers: authHeader(),
    })
};

const getUserById = id => {
  return axios.get(API_URL + "get-user/" + id,
    {
      headers: authHeader(),
    })
};

const updateUser = (id, fields) => {
  return axios.put(API_URL + "update/user/" + id, fields,
    {
      headers: authHeader(),
    })
};

const getActiveRoles = () => {
  return axios.get(API_URL + "active-role",
    {
      headers: authHeader(),
    })
};

const deleteUser = id => {
  return axios.delete(API_URL + "delete/user/" + id,
    {
      headers: authHeader(),
    })
};

const changeUserStatus = (id) => {
  return axios.get(API_URL + "change/user/status/" + id,
  {
      headers: authHeader(),
  })
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  getActiveRoles,
  deleteUser,
  changeUserStatus
};