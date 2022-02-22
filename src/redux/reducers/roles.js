import {
    GET_ROLES_SUCCESS,
    GET_ROLES_FAIL,
    SET_ROLES,
    FETCHING_ROLES,
    SET_ROLE,
} from "../types";

const initialState = {
    roles: [],
    role: null,
    isFetching: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ROLES_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case GET_ROLES_FAIL:
            return {
                ...state,
                success: false,
            };
        case FETCHING_ROLES:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_ROLES:
            return {
                ...state,
                roles: payload,
            };

        case SET_ROLE:
            return {
                ...state,
                role: payload,
            };
        default:
            return state;
    }
}
