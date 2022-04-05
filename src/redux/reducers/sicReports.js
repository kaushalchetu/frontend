import {
    SET_SIC_OPTIONS,
    FETCHING_SIC_REPORTS_DATA,
    SET_SIC_REPORTS_DATA,
    FETCHING_SIC_REPORTS,
    SET_SIC_REPORTS,
    FETCHING_SIC_GRAPH_CHARTS,
    SET_SIC_GRAPH_CHARTS
} from "../types";

const initialState = {
    sicOptions: [],
    sicReportsData: [],
    sicReports: [],
    isFetching: false,
    sicGraphCharts: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SIC_OPTIONS:
            return {
                ...state,
                sicOptions: payload,
            };
        case FETCHING_SIC_REPORTS_DATA:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC_REPORTS_DATA:
            return {
                ...state,
                sicReportsData: payload,
            };
        case FETCHING_SIC_REPORTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC_REPORTS:
            return {
                ...state,
                sicReports: payload,
            };
        case FETCHING_SIC_GRAPH_CHARTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC_GRAPH_CHARTS:
            return {
                ...state,
                sicGraphCharts: payload,
            };
        default:
            return state;
    }
}
