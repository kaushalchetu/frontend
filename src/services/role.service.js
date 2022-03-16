import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../helpers/Constant";

//const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Role create API code start
const createRole = (fields) => {
    return axios.post(API_URL + "create/role", fields,
        {
            headers: authHeader(),
        })
};
//Role create API code end

//Get all roles API code start
const getAllRoles = () => {
    return axios.get(API_URL + "roles",
        {
            headers: authHeader(),
        })
};
//Get all roles API code end

//Get role by id API code start
const getRoleById = id => {
    return axios.get(API_URL + "role/" + id,
        {
            headers: authHeader(),
        })
};
//Get role by id API code end

//Role update API code start
const updateRole = (id, fields) => {
    return axios.put(API_URL + "update/role/" + id, fields,
        {
            headers: authHeader(),
        })
};
//Role update API code end

//Role status change active(1)/inactive(2) API code start
const changeRoleStatus = (id) => {
    return axios.get(API_URL + "change/role/status/" + id,
        {
            headers: authHeader(),
        })
};
//Role status change active(1)/inactive(2) API code end

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    changeRoleStatus,
};