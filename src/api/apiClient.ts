import axios from "axios";

export const api = axios.create({
  baseURL: "https://trading-omega-sepia.vercel.app/api",
  // baseURL: "http://localhost:4000/api",
  timeout: 5000,
//   withCredentials: false, // ❌ remove this, you don't use cookies
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

