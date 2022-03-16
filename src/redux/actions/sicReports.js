import {
    FETCHING_SICS,
    SET_SIC_OPTIONS,
    SET_SIC_REPORTS_DATA,
    FETCHING_SIC_REPORTS_DATA,
    SET_SIC_REPORTS,
    FETCHING_SIC_REPORTS,
    SET_MESSAGE
} from "../types";

import SicReportService from "../../services/sicReport.service";

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
