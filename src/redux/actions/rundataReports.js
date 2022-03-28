import {
    SET_RUNDATA_REPORTS_DATA,
    FETCHING_RUNDATA_REPORTS_DATA,
    SET_RUNDATA_REPORTS,
    FETCHING_RUNDATA_REPORTS
} from "../types";
import RundataReportService from "../../services/rundataReport.service";
import { toast } from 'react-toastify';

//Import rundata report code start
export const importRundataReports = (fields) => (dispatch) => {
    return RundataReportService.importRundataReports(fields).then(
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
//Import rundata report code end

//Rundata report data code start
export const getRundataReportsData = () => (dispatch) => {
    dispatch({
        type: FETCHING_RUNDATA_REPORTS_DATA,
        payload: true,
    });
    return RundataReportService.rundataReportsData().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_RUNDATA_REPORTS_DATA,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_RUNDATA_REPORTS_DATA,
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
                type: FETCHING_RUNDATA_REPORTS_DATA,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Rundata report data code end

//Generate rundata report code start
export const generateRundataReports = () => (dispatch) => {
    dispatch({
        type: FETCHING_RUNDATA_REPORTS,
        payload: true,
    });
    return RundataReportService.generateRundataReports().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_RUNDATA_REPORTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_RUNDATA_REPORTS,
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
                type: FETCHING_RUNDATA_REPORTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Generate rundata report code end

