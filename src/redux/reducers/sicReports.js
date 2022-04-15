import {
    SET_SIC_OPTIONS,
    FETCHING_SIC_REPORTS_DATA,
    SET_SIC_REPORTS_DATA,
    FETCHING_SIC_REPORTS,
    SET_SIC_REPORTS,

    FETCHING_SIC30_GRAPH_CHARTS,
    SET_SIC30_GRAPH_CHARTS,
    FETCHING_SIC27_GRAPH_CHARTS,
    SET_SIC27_GRAPH_CHARTS,
    FETCHING_SIC14_GRAPH_CHARTS,
    SET_SIC14_GRAPH_CHARTS,

    SET_SIC_GRAPH_TYPE,
    FETCHING_SIC_GRAPH,
    SET_SIC_GRAPH_CHART
} from "../types";

const initialState = {
    sicReportsData: [],
    sicReports: [],
    isFetching: false,
    
    sic30GraphCharts: [],
    sic27GraphCharts: [],
    sic14GraphCharts: [],

    sicOptions: [],
    sicGraphType: '',
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

        case FETCHING_SIC30_GRAPH_CHARTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC30_GRAPH_CHARTS:
            return {
                ...state,
                sic30GraphCharts: payload,
            };
        case FETCHING_SIC27_GRAPH_CHARTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC27_GRAPH_CHARTS:
            return {
                ...state,
                sic27GraphCharts: payload,
            };
        case FETCHING_SIC14_GRAPH_CHARTS:
            return {
                ...state,
                isFetching: payload,
            };
        case SET_SIC14_GRAPH_CHARTS:
            return {
                ...state,
                sic14GraphCharts: payload,
            };

        // ==== //
        case SET_SIC_GRAPH_TYPE:
            return {
                ...state,
                sicGraphType: payload,
            };
        case SET_SIC_GRAPH_CHART:
            return {
                ...state,
                sicGraphCharts: payload,
            };
        case FETCHING_SIC_GRAPH:
            return {
                ...state,
                isFetching: payload,
            };
        // ==== //
        default:
            return state;
    }
}
