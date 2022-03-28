import {
    FETCHING_RUNDATA_REPORTS_DATA,
    SET_RUNDATA_REPORTS_DATA,
    FETCHING_RUNDATA_REPORTS,
    SET_RUNDATA_REPORTS
} from "../types";

const initialState = {
    rundataReportsData: [],
    rundataReports: [],
    isFetching: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case FETCHING_RUNDATA_REPORTS_DATA:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_RUNDATA_REPORTS_DATA:
            return {
                ...state,
                rundataReportsData: payload,
            };
        case FETCHING_RUNDATA_REPORTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_RUNDATA_REPORTS:
            return {
                ...state,
                rundataReports: payload,
            };
        default:
            return state;
    }
}
