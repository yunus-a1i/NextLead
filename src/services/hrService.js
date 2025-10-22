import axiosInstance from "../api/axiosInstance";

const hrService = {

  login: async (data) => {
    try {
      const res = await axiosInstance.post("/hr/login", data);
      return res.data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Login failed");
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/hr/logout");
      return res.data;
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Logout failed");
    }
  },
  
  // Create HR
  createHr: async (hrData) => {
    const response = await axiosInstance.post(`/hr/createHr`, hrData);
    return response.data;
  },

  // Get HR by ID
  getHr: async (id, token) => {
    const response = await axiosInstance.get(`/hr/getHr/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Update HR
  updateHr: async (id, hrData, token) => {
    const response = await axiosInstance.put(`/hr/updateHr/${id}`, hrData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Delete HR
  deleteHr: async (id, token) => {
    const response = await axiosInstance.delete(`/hr/deleteHr/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default hrService;
