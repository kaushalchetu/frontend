import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../helpers/Constant";

//const API_URL = "http://127.0.0.1:8000/api/";       //API base url code

//Get all sic series name API code start
const getAllSics = () => {
  return axios.get(API_URL + "mastersic/display",
    {
      headers: authHeader(),
    })
};
//Get all sic series name API code end

//Import sic report API code start
const importSicReports = (fields) => {
  return axios.post(API_URL + "import/sic", fields,
    {
      headers: authHeader(),
    })
};
//Import sic report API code end

//Sic report data API code start
const sicReportsData = () => {
  return axios.get(API_URL + "display/datalist",
    {
      headers: authHeader(),
    })
};
//Sic report data API code end

//Generate sic report API code start
const generateSicReports = () => {
  return axios.get(API_URL + "display/report",
    {
      headers: authHeader(),
    })
};
//Generate sic report API code end

//Sic30 graph chart API code start
const sic30GraphCharts = () => {
  return axios.get(API_URL + "sic30/report",
    {
      headers: authHeader(),
    })
};
//Sic30 graph chart API code end

//Sic27 graph chart API code start
const sic27GraphCharts = () => {
  return axios.get(API_URL + "sic27/report",
    {
      headers: authHeader(),
    })
};
//Sic27 graph chart API code end

//Sic14 graph chart API code start
const sic14GraphCharts = () => {
  return axios.get(API_URL + "sic14/report",
    {
      headers: authHeader(),
    })
};
//Sic14 graph chart API code end

//Dynamic Sic graph charts API code start
const sicGraphCharts = (type) => {
  return axios.get(API_URL + "sic/report/" + type,
    {
      headers: authHeader(),
    })
};
//Dynamic Sic graph charts API code end

export default {
  getAllSics,
  importSicReports,
  sicReportsData,
  generateSicReports,
  sic30GraphCharts,
  sic27GraphCharts,
  sic14GraphCharts,
  sicGraphCharts
};
