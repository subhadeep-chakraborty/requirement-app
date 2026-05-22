import axios from "axios";
import { getToken, removeToken, isTokenExpired } from "../utils/token";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    if (isTokenExpired(token)) {
      removeToken();
      window.location.href = "/login";
      return;
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor (global error handling)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;