import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 🔹 Create axios instance (cleaner + reusable)
const api = axios.create({
  baseURL: BASE_URL,
});

// 🔹 Attach token automatically to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Handle token expiry / unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid / expired
      localStorage.removeItem("token");
      window.location.href = "/login"; // auto redirect
    }

    return Promise.reject(error);
  }
);

//  GET all requirements
export const getRequirements = async () => {
  try {
    const res = await api.get("/requirements/");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch requirements" };
  }
};

//  CREATE requirement
export const createRequirement = async (data) => {
  try {
    const res = await api.post("/requirements/", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create requirement" };
  }
};