// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/user"; // change to your backend URL

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/createUser`, userData);
  return res.data; // { user, token }
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data; // { user, token }
};

export const logout = async () => {
  // If you store token in localStorage
  const logout = await axios.post(`${API_URL}/logout`)
};

export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // user data
};
