import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // adjust if needed
  withCredentials: true, // if you're using cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
