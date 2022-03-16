import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../helpers/Constant";

//const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Import rundata report API code start
const importRundataReports = (fields) => {
  return axios.post(API_URL + "import/file", fields,
    {
      headers: authHeader(),
    })
};
//Import rundata report API code end

//Rundata report data API code start
const rundataReportsData = () => {
  return axios.get(API_URL + "display/datalist",
    {
      headers: authHeader(),
    })
};
//Rundata report data API code end

//Generate rundata report API code start
const generateRundataReports = () => {
  return axios.get(API_URL + "display/report",
    {
      headers: authHeader(),
    })
};
//Generate rundata report API code end

export default {
  importRundataReports,
  rundataReportsData,
  generateRundataReports
};
