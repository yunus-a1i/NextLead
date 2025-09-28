import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

// Get user/token from localStorage when app loads
const user = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

// Async actions
export const loginUser = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const res = await userService.login(data);

    // Save token & user in localStorage
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
  }
});

export const logoutUser = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const res = await userService.logout();

    // Clear localStorage on logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Logout failed");
  }
});

export const createUser = createAsyncThunk("user/createUser", async (data, thunkAPI) => {
  try {
    return await userService.createUser(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Create user failed");
  }
});

export const fetchUser = createAsyncThunk("user/getUser", async (id, thunkAPI) => {
  try {
    return await userService.getUser(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Fetch user failed");
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, data }, thunkAPI) => {
  try {
    return await userService.updateUser(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Update user failed");
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id, thunkAPI) => {
  try {
    return await userService.deleteUser(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Delete user failed");
  }
});

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user,
    token,
    users: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // Create
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.success = true;
      })

      // Fetch
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Update
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
      })

      // Delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.meta.arg);
        state.success = true;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
