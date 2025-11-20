// src/store/bookmarkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkService from '../services/bookmarkService';

// --- Thunks ---------------------------------------------------

// fetch user's bookmarks (paginated)
export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchBookmarks',
  async ({ page = 1, limit = 20 } = {}, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.token;
      // If you prefer to call axios directly, adapt here. Using service keeps it DRY.
      const res = await bookmarkService.getBookmarks({ page, limit, token });
      // Expecting shape: { success, data: { docs, total, page, limit } } or { data: docsArray }
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// add a bookmark (body: { interviewPostId })
export const addBookmark = createAsyncThunk(
  'bookmark/addBookmark',
  async (interviewPostId, { rejectWithValue, getState }) => {
    try {
      if (!interviewPostId) throw new Error('interviewPostId is required');
      const { auth } = getState();
      const token = auth?.token;
      const res = await bookmarkService.addBookmark(interviewPostId, token);
      // API likely returns created bookmark doc (or wrapper)
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// remove a bookmark by docId or postId. payload is { docId } or { postId }
export const removeBookmark = createAsyncThunk(
  'bookmark/removeBookmark',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const token = auth?.token;
      let res;
      if (payload?.docId) {
        res = await bookmarkService.removeBookmarkByDocId(payload.docId, token);
        return { removedBy: 'docId', docId: payload.docId, data: res };
      } else if (payload?.postId) {
        res = await bookmarkService.removeBookmarkByPostId(payload.postId, token);
        return { removedBy: 'postId', postId: payload.postId, data: res };
      } else {
        throw new Error('Either docId or postId is required');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// --- Initial state -------------------------------------------
const initialState = {
  bookmarks: [], // array of bookmark docs
  total: 0,
  page: 1,
  limit: 20,
  loading: false,
  error: null,
};

// --- Slice ---------------------------------------------------
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

    // Local optimistic add: payload should be a bookmark-like object
    optimisticAdd(state, action) {
      const doc = action.payload;
      // avoid duplicates by id or post id (defensive: check both possible keys)
      const exists = state.bookmarks.find(
        (b) =>
          (b._id && doc._id && b._id === doc._id) ||
          (b.interviewPostId && doc.interviewPostId && b.interviewPostId === doc.interviewPostId) ||
          (b.interveiwPostId && doc.interveiwPostId && b.interveiwPostId === doc.interveiwPostId)
      );
      if (!exists) {
        state.bookmarks.unshift(doc);
        state.total += 1;
      }
    },

    // Local optimistic remove: payload { docId } or { postId }
    optimisticRemove(state, action) {
      const { docId, postId } = action.payload || {};
      state.bookmarks = state.bookmarks.filter((b) => {
        if (docId) return b._id !== docId;
        if (postId) {
          // defensive: support both spelled keys
          return b.interviewPostId !== postId && b.interveiwPostId !== postId && b.interviewPost !== postId;
        }
        return true;
      });
      state.total = Math.max(0, state.total - (docId || postId ? 1 : 0));
    },
  },

  extraReducers: (builder) => {
    // fetchBookmarks
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;

        // Normalize supported shapes:
        // 1) { success, data: { docs, total, page, limit } }
        // 2) { data: docsArray } or docs array directly
        if (payload && payload.data && typeof payload.data === 'object') {
          const { docs = [], total = 0, page = 1, limit = state.limit } = payload.data;
          state.bookmarks = docs;
          state.total = total;
          state.page = page;
          state.limit = limit;
        } else if (Array.isArray(payload)) {
          state.bookmarks = payload;
          state.total = payload.length;
          state.page = 1;
        } else if (payload && Array.isArray(payload.docs)) {
          // fall back if server returned { docs, total, page }
          state.bookmarks = payload.docs;
          state.total = payload.total ?? payload.docs.length;
          state.page = payload.page ?? 1;
          state.limit = payload.limit ?? state.limit;
        } else {
          // unknown shape: set as-is or empty
          state.bookmarks = payload || [];
          state.total = Array.isArray(payload) ? payload.length : state.total;
        }
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })

      // addBookmark
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.loading = false;
        // payload may be { data: doc } or doc directly
        const doc = action.payload?.data || action.payload;
        if (doc) {
          // avoid duplicates; accept both spellings for post id for defensiveness
          const exists = state.bookmarks.find(
            (b) =>
              (b._id && doc._id && b._id === doc._id) ||
              (b.interviewPostId && doc.interviewPostId && b.interviewPostId === doc.interviewPostId) ||
              (b.interveiwPostId && doc.interveiwPostId && b.interveiwPostId === doc.interveiwPostId)
          );
          if (!exists) {
            state.bookmarks.unshift(doc);
            state.total += 1;
          }
        }
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })

      // removeBookmark
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.loading = false;
        const result = action.payload || {};
        if (result.removedBy === 'docId' && result.docId) {
          state.bookmarks = state.bookmarks.filter((b) => b._id !== result.docId);
          state.total = Math.max(0, state.total - 1);
        } else if (result.removedBy === 'postId' && result.postId) {
          state.bookmarks = state.bookmarks.filter(
            (b) =>
              b.interviewPostId !== result.postId &&
              b.interveiwPostId !== result.postId &&
              b.interviewPost !== result.postId
          );
          state.total = Math.max(0, state.total - 1);
        } else {
          // fallback: attempt to reconcile from returned data if possible (no-op otherwise)
          // e.g., if server returned the deleted doc id in result.data
          const returned = result.data;
          if (returned && returned.deletedId) {
            state.bookmarks = state.bookmarks.filter((b) => b._id !== returned.deletedId);
            state.total = Math.max(0, state.total - 1);
          }
        }
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

// Exports
export const { clearBookmarks, optimisticAdd, optimisticRemove } = bookmarkSlice.actions;

// Selectors
export const selectBookmarks = (state) => state.bookmark.bookmarks;
export const selectBookmarkTotal = (state) => state.bookmark.total;
export const selectBookmarkPage = (state) => state.bookmark.page;
export const selectBookmarkLimit = (state) => state.bookmark.limit;
export const selectBookmarkLoading = (state) => state.bookmark.loading;
export const selectBookmarkError = (state) => state.bookmark.error;

export default bookmarkSlice.reducer;
