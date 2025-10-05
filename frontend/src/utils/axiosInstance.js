// utils/axiosInstance.js

import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Request Interceptor: Attach token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      console.log("🔐 Token found and attached to request");
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor: Handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("⛔ Unauthorized, redirecting to login...");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("💥 Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⏱️ Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;