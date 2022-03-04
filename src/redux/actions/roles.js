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

export const clearRole = () => (dispatch) => {
    dispatch({
        type: SET_ROLE,
        payload: null,
    });
};


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