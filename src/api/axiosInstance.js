import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // adjust if needed
  withCredentials: true, // if you're using cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
