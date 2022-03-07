import {
    SET_REPORTS,
    FETCHING_REPORTS
} from "../types";

import ReportService from "../../services/report.service";

//Display report code start
export const displayReport = () => (dispatch) => {
    dispatch({
        type: FETCHING_REPORTS,
        payload: true,
    });
    return ReportService.displayReport().then(
        (response) => {
            if (response.data.data) {
                dispatch({
                    type: SET_REPORTS,
                    payload: response.data.data,
                });

                dispatch({
                    type: FETCHING_REPORTS,
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
                type: FETCHING_REPORTS,
                payload: false,
            });

            return Promise.reject();
        }
    );
};
//Display report code end
