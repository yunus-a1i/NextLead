import axiosInstance from "../api/axiosInstance";

const postService = {
  // Create a post
  createPost: async (postData, token) => {
    const response = await axiosInstance.post(`/post/createpost`, postData, {
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
  getPosts: async (token, postId) => {
    const response = await axiosInstance.get(`/post/getPosts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Delete a post
  deletePost: async (postId, token) => {
    const response = await axiosInstance.delete(`/post/deletePost/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { id: postId }, // DELETE with body
    });
    return response.data;
  },

  // Get all posts (public)
  getAllPosts: async (page = 1, limit = 4) => {
    const response = await axiosInstance.get(`/post/getAllPosts`, {
      params: { page, limit },
    });
    return response.data;
  },

  getAllPostsFull: async () => {
    const response = await axiosInstance.get(`/post/getAllPosts/full`);
    return response.data;
  },
};

export default postService;
