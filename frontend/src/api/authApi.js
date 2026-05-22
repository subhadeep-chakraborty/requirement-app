import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//  LOGIN API
export const loginApi = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};

//  SIGNUP API
export const signupApi = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, data);
  return response.data;
};