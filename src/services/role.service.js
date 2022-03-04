import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/";

const createRole = (fields) => {
    return axios.post(API_URL + "create-role", fields,
        {
            headers: authHeader(),
        })
};

const getAllRoles = () => {
    return axios.get(API_URL + "show-role",
        {
            headers: authHeader(),
        })
};

const getRoleById = id => {
    return axios.get(API_URL + "get-role/" + id,
        {
            headers: authHeader(),
        })
};

const updateRole = (id, fields) => {
    return axios.put(API_URL + "update-role/" + id, fields,
        {
            headers: authHeader(),
        })
};


const changeRoleStatus = (id) => {
    return axios.get(API_URL + "change-role-status/" + id,
    {
        headers: authHeader(),
    })
};

export default {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    changeRoleStatus,
};