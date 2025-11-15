import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
// Fetch user's bookmarks (paginated)
export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchBookmarks',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const res = await axios.get(`/api/bookmark/bookmarks?limit=${limit}&page=${page}`, {
        headers: { Authorization: `Bearer ${auth?.token || ''}` },
      });
      return res.data; // expected { success, data: { docs: [], total, page, limit } }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Add a bookmark (body: { interveiwPostId })
export const addBookmark = createAsyncThunk(
  'bookmark/addBookmark',
  async (interveiwPostId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const res = await axios.post(
        '/api/bookmark',
        { interveiwPostId },
        { headers: { Authorization: `Bearer ${auth?.token || ''}` } }
      );
      return res.data; // expected saved document
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Remove a bookmark. Accepts either docId (the bookmark document id) or postId to delete by post.
// payload should be { docId } or { postId }
export const removeBookmark = createAsyncThunk(
  'bookmark/removeBookmark',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      let res;
      if (payload.docId) {
        res = await axios.delete(`/api/bookmark/${payload.docId}`, {
          headers: { Authorization: `Bearer ${auth?.token || ''}` },
        });
      } else if (payload.postId) {
        res = await axios.delete(`/api/bookmark?postId=${payload.postId}`, {
          headers: { Authorization: `Bearer ${auth?.token || ''}` },
        });
      } else {
        throw new Error('Either docId or postId is required');
      }
      return { removed: payload, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  bookmarks: [],
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    clearBookmarks(state) {
      state.bookmarks = [];
      state.total = 0;
      state.page = 1;
      state.error = null;
    },
    // Optional local-only optimistic add (used if you want immediate UI update)
    optimisticAdd(state, action) {
      state.bookmarks.unshift(action.payload);
      state.total += 1;
    },
    optimisticRemove(state, action) {
      const { docId, postId } = action.payload;
      state.bookmarks = state.bookmarks.filter((b) => {
        if (docId) return b._id !== docId;
        if (postId) return b.interveiwPostId !== postId && b.interviewPostId !== postId;
        return true;
      });
      state.total = Math.max(0, state.total - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        // If API returns paginated wrapper: { docs, total, page, limit }
        const payload = action.payload;
        if (payload && payload.data) {
          // handle consistent shape
          const { docs = [], total = 0, page = 1, limit = state.limit } = payload.data;
          state.bookmarks = docs;
          state.total = total;
          state.page = page;
          state.limit = limit;
        } else if (Array.isArray(payload)) {
          state.bookmarks = payload;
          state.total = payload.length;
        } else {
          state.bookmarks = payload || [];
          state.total = (Array.isArray(payload) && payload.length) || state.total;
        }
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })

      // add
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.loading = false;
        // API likely returns created bookmark doc
        const doc = action.payload?.data || action.payload;
        if (doc) {
          // avoid dupes
          const exists = state.bookmarks.find((b) => b._id === doc._id || b.interveiwPostId === doc.interveiwPostId);
          if (!exists) state.bookmarks.unshift(doc);
          state.total += 1;
        }
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })

      // remove
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.loading = false;
        const { removed } = action.payload;
        if (removed.docId) {
          state.bookmarks = state.bookmarks.filter((b) => b._id !== removed.docId);
        } else if (removed.postId) {
          state.bookmarks = state.bookmarks.filter((b) => b.interveiwPostId !== removed.postId && b.interviewPostId !== removed.postId);
        }
        state.total = Math.max(0, state.total - 1);
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearBookmarks, optimisticAdd, optimisticRemove } = bookmarkSlice.actions;

// Selectors
export const selectBookmarks = (state) => state.bookmark.bookmarks;
export const selectBookmarkLoading = (state) => state.bookmark.loading;
export const selectBookmarkError = (state) => state.bookmark.error;

export default bookmarkSlice.reducer;
