import axiosInstance from "../api/axiosInstance";

const userService = {
  login: async (data) => {
    try {
      const res = await axiosInstance.post("/user/login", data);
      return res.data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Login failed");
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      return res.data;
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Logout failed");
    }
  },

  createUser: async (data) => {
    try {
      const res = await axiosInstance.post("/user/createUser", data);
      return res.data;
    } catch (err) {
      console.error("Create user failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Create user failed");
    }
  },

  getUser: async (id) => {
    try {
      const res = await axiosInstance.get(`/user/getUser/${id}`);
      return res.data;
    } catch (err) {
      console.error("Get user failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Get user failed");
    }
  },

  updateUser: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/user/updateUser/${id}`, data);
      return res.data;
    } catch (err) {
      console.error("Update user failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Update user failed");
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axiosInstance.delete(`/user/deleteUser/${id}`);
      return res.data;
    } catch (err) {
      console.error("Delete user failed:", err.response?.data || err.message);
      throw err.response?.data || new Error("Delete user failed");
    }
  },
};

export default userService;
