import {
    SET_REPORTS,
    FETCHING_REPORTS,
    SET_MESSAGE
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

//Import report code start
export const importReport = (fields) => (dispatch) => {
    return ReportService.importReport(fields).then(
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
  //Import report code end
