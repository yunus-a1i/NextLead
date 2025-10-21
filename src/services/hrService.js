import axiosInstance from "../api/axiosInstance";

const hrService = {
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
