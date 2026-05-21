import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

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