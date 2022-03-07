import {
    FETCHING_REPORTS,
    SET_REPORTS
} from "../types";

const initialState = {
    reports: [],
    isFetching: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCHING_REPORTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_REPORTS:
            return {
                ...state,
                reports: payload,
            };
        default:
            return state;
    }
}
