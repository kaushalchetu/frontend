import {
    ROLE_SUCCESS,
    ROLE_FAIL,
    SET_MESSAGE,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL,
    SET_ROLES,
    FETCHING_ROLES,
    SET_ROLE
} from "../types";

import RoleService from "../../services/role.service";

//Role create code start
export const createRole = (data) => (dispatch) => {
    return RoleService.createRole(data).then(
        (response) => {
            //console.log(response)
            dispatch({
                type: ROLE_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ROLE_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
//Role create code end

//Get all roles code start
export const getAllRoles = () => (dispatch) => {
    dispatch({
        type: FETCHING_ROLES,
        payload: true,
    });
    return RoleService.getAllRoles().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: GET_ROLES_SUCCESS,
                });

                dispatch({
                    type: SET_ROLES,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_ROLES,
                    payload: false,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_ROLES_FAIL,
            });

            dispatch({
                type: FETCHING_ROLES,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Get all roles code end

//Get role by id code start
export const getRole = id => (dispatch) => {
    dispatch({
        type: FETCHING_ROLES,
        payload: true,
    });
    return RoleService.getRoleById(id).then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: GET_ROLES_SUCCESS,
                });

                dispatch({
                    type: SET_ROLE,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_ROLES,
                    payload: false,
                });
            }

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_ROLES_FAIL,
            });

            dispatch({
                type: FETCHING_ROLES,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Get role by id code end

//Role update code start
export const updateRole = (id, fields) => (dispatch) => {
    return RoleService.updateRole(id, fields).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
//Role update code end

//Role clear code start
export const clearRole = () => (dispatch) => {
    dispatch({
        type: SET_ROLE,
        payload: null,
    });
};
//Role clear code end

//Role status change code start
export const changeRoleStatus = (id) => (dispatch) => {
    return RoleService.changeRoleStatus(id).then(
        (response) => {
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
//Role status change code end