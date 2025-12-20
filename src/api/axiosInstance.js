import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://next-backend-2-yn5j.onrender.com/api", // adjust if needed
  // baseURL: "http://localhost:4000/api", // adjust if needed
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
