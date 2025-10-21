import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/postService";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  success: false,
  message: "",
};

// Async Thunks
export const createPostThunk = createAsyncThunk(
  "posts/create",
  async ({ postData, token }, thunkAPI) => {
    try {
      return await postService.createPost(postData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updatePostThunk = createAsyncThunk(
  "posts/update",
  async ({ postData, token }, thunkAPI) => {
    try {
      return await postService.updatePost(postData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getPostsThunk = createAsyncThunk(
  "posts/getPosts",
  async (token, thunkAPI) => {
    try {
      return await postService.getPosts(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deletePostThunk = createAsyncThunk(
  "posts/delete",
  async ({ postId, token }, thunkAPI) => {
    try {
      return await postService.deletePost(postId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllPostsThunk = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts.push(action.payload);
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updatePostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get user's posts
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deletePostThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg.postId
        );
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get all posts
      .addCase(getAllPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = action.payload;
      })
      .addCase(getAllPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetPostState } = postSlice.actions;
export default postSlice.reducer;
