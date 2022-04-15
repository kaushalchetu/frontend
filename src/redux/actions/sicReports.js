import {
    FETCHING_SICS,
    SET_SIC_OPTIONS,
    SET_SIC_REPORTS_DATA,
    FETCHING_SIC_REPORTS_DATA,
    SET_SIC_REPORTS,
    FETCHING_SIC_REPORTS,
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
import SicReportService from "../../services/sicReport.service";
import { toast } from 'react-toastify';

//Get all sic series name code start
export const getAllSicsOptions = () => (dispatch) => {
    dispatch({
        type: FETCHING_SICS,
        payload: true,
    });
    return SicReportService.getAllSics().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC_OPTIONS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SICS,
                    payload: false,
                });
            }
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: FETCHING_SICS,
                payload: false,
            });
            return Promise.reject();

        }
    );
}
//Get all sic series name code end

//Import sic report code start
export const importSicReports = (fields) => (dispatch) => {
    return SicReportService.importSicReports(fields).then(
        (response) => {
            toast.success(response.data.message, {
                theme: "colored"
            })
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error(message, {
                theme: "colored"
            });
            return Promise.reject();
        }
    );
};
//Import sic report code end

//Sic report data code start
export const getSicReportsData = () => (dispatch) => {
    dispatch({
        type: FETCHING_SIC_REPORTS_DATA,
        payload: true,
    });
    return SicReportService.sicReportsData().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC_REPORTS_DATA,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC_REPORTS_DATA,
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
                type: FETCHING_SIC_REPORTS_DATA,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Sic report data code end

//Generate sic report code start
export const generateSicReports = () => (dispatch) => {
    dispatch({
        type: FETCHING_SIC_REPORTS,
        payload: true,
    });
    return SicReportService.generateSicReports().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC_REPORTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC_REPORTS,
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
                type: FETCHING_SIC_REPORTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Generate sic report code end

//Sic30 graph charts code start
export const sic30GraphCharts = () => (dispatch) => {
    dispatch({
        type: FETCHING_SIC30_GRAPH_CHARTS,
        payload: true,
    });
    return SicReportService.sic30GraphCharts().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC30_GRAPH_CHARTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC30_GRAPH_CHARTS,
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
                type: FETCHING_SIC30_GRAPH_CHARTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Sic30 graph charts code end

//Sic27 graph charts code start
export const sic27GraphCharts = () => (dispatch) => {
    dispatch({
        type: FETCHING_SIC30_GRAPH_CHARTS,
        payload: true,
    });
    return SicReportService.sic27GraphCharts().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC27_GRAPH_CHARTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC27_GRAPH_CHARTS,
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
                type: FETCHING_SIC27_GRAPH_CHARTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Sic27 graph charts code end

//Sic14 graph charts code start
export const sic14GraphCharts = () => (dispatch) => {
    dispatch({
        type: FETCHING_SIC14_GRAPH_CHARTS,
        payload: true,
    });
    return SicReportService.sic14GraphCharts().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC14_GRAPH_CHARTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC14_GRAPH_CHARTS,
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
                type: FETCHING_SIC14_GRAPH_CHARTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Sic27 graph charts code end

//Dynamic Sic graph charts code start
export const getSicGraphChart = (type) => (dispatch) => {
    console.log(type)
    dispatch({
        type: FETCHING_SIC_GRAPH,
        payload: true,
    });

    return SicReportService.sicGraphCharts(type).then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_SIC_GRAPH_CHART,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_SIC_GRAPH,
                    payload: false,
                });

                dispatch({
                    type: SET_SIC_GRAPH_TYPE,
                    payload: type,
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
                type: FETCHING_SIC_GRAPH,
                payload: false,
            });

            return Promise.reject();
        }
    );
}
//Dynamic Sic graph charts code end

