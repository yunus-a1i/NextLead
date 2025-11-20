import axiosInstance from "../api/axiosInstance";
/**
 * Bookmark Service
 * Small wrapper around axios to call bookmark API endpoints.
 * Each function accepts an optional `token` param; if not provided,
 * the caller should set axios.defaults.headers.common.Authorization elsewhere.
 */

function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getBookmarks = async ({ page = 1, limit = 20, token } = {}) => {
  const res = await axiosInstance.get(`/bookmark/bookmarks?limit=${limit}&page=${page}`, {
    headers: authHeader(token),
  });
  return res.data; // expected: { success, data: { docs, total, page, limit } }
};

export const addBookmark = async (interveiwPostId, token) => {
  if (!interveiwPostId) throw new Error('interveiwPostId is required');
  const res = await axiosInstance.post(
    `/bookmark`,
    { interveiwPostId },
    { headers: authHeader(token) }
  );
  return res.data; // created bookmark doc
};

export const removeBookmarkByDocId = async (docId, token) => {
  if (!docId) throw new Error('docId is required');
  const res = await axiosInstance.delete(`/bookmark/${docId}`, {
    headers: authHeader(token),
  });
  return res.data;
};

export const removeBookmarkByPostId = async (postId, token) => {
  if (!postId) throw new Error('postId is required');
  const res = await axiosInstance.delete(`/bookmark?postId=${postId}`, {
    headers: authHeader(token),
  });
  return res.data;
};

export default {
  getBookmarks,
  addBookmark,
  removeBookmarkByDocId,
  removeBookmarkByPostId,
};
