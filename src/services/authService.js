// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // change to your backend URL

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data; // { user, token }
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data; // { user, token }
};

export const logout = () => {
  // If you store token in localStorage
  localStorage.removeItem("token");
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // user data
};
