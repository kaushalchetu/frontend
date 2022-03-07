import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Display report API code start
const displayReport = () => {
    return axios.get(API_URL + "display/report",
        {
            headers: authHeader(),
        })
};
//Display report API code end

export default {
    displayReport
};
