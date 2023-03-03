import axios from "axios";

export const API_URL = process.env.REACT_APP_BACKEND_DOMAIN;

export const token = localStorage.getItem('token')

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_DOMAIN;



export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Authorization": `Token ${localStorage.getItem('token')}`
  }
}); 

export const apiWithoutToken = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export const apiGalley = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Token ${token ? token : ''}`
  }
});

export default axios;