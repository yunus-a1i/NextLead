import axiosInstance from "../api/axiosInstance";

const postService = {
  // Create a post
  createPost: async (postData, token) => {
    const response = await axiosInstance.post(`/post/createPost`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Update a post
  updatePost: async (postData, token) => {
    const response = await axiosInstance.put(`/post/updatePost`, postData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Get posts for the logged-in user
  getPosts: async (token) => {
    const response = await axiosInstance.get(`/post/getPosts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Delete a post
  deletePost: async (postId, token) => {
    const response = await axiosInstance.delete(`/post/deletePost`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: postId }, // DELETE with body
    });
    return response.data;
  },

  // Get all posts (public)
  getAllPosts: async () => {
    const response = await axiosInstance.get(`/post/getAllPosts`);
    return response.data;
  },
};

export default postService;
