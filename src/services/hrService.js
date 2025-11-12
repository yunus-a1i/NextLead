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
  fetchHr: async (id, token) => {
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

  getAllPostsByHr: async (id) => {
    const response = await axiosInstance.get(`/hr/getAllPostsByHr/${id}/posts`);
    return response.data;
  },
  // 👥 NEW: Get all attendees who applied to this HR’s jobs
  getAllAttendeesByHr: async (id, token, page = 1, limit = 20) => {
    try {
      const response = await axiosInstance.get(`/hr/${id}/attendees`, {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      console.error(
        "Fetching HR attendees failed:",
        err.response?.data || err.message
      );
      throw err.response?.data || new Error("Unable to fetch attendees.");
    }
  },
};

export default hrService;
