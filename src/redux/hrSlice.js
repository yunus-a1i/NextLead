import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hrService from "../services/hrService";

const initialState = {
  hr: null,
  posts: [],

  // attendees list for the HR
  attendees: [],
  attendeesMeta: null, // { page, limit, total }
  attendeesLoading: false,
  attendeesError: false,
  attendeesMessage: "",

  // generic flags
  loading: false,
  error: false,
  success: false,
  message: "",
};

// Async actions
export const loginHr = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const res = await hrService.login(data);

      // Save token & user in localStorage
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

export const logoutHr = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const res = await hrService.logout();

    // Clear localStorage on logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Logout failed");
  }
});

export const createHr = createAsyncThunk(
  "hr/create",
  async (hrData, thunkAPI) => {
    try {
      return await hrService.createHr(hrData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchHr = createAsyncThunk(
  "hr/get",
  async ({ id, token }, thunkAPI) => {
    try {
      return await hrService.fetchHr(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateHr = createAsyncThunk(
  "hr/update",
  async ({ id, hrData, token }, thunkAPI) => {
    try {
      return await hrService.updateHr(id, hrData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteHr = createAsyncThunk(
  "hr/delete",
  async ({ id, token }, thunkAPI) => {
    try {
      return await hrService.deleteHr(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllPostsByHr = createAsyncThunk(
  "hr/getAllPostsByHr",
  async (id, thunkAPI) => {
    try {
      return await hrService.getAllPostsByHr(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// NEW: fetch attendees (candidates) who applied to this HR's posts
// payload should be { id, token, page?, limit? }
export const getAllAttendeesByHr = createAsyncThunk(
  "hr/getAllAttendeesByHr",
  async ({ id, token, page = 1, limit = 20 }, thunkAPI) => {
    try {
      return await hrService.getAllAttendeesByHr(id, token, page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error
      );
    }
  }
);

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    resetHrState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create HR
      .addCase(createHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload?.data ?? action.payload;
      })
      .addCase(createHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || action.error?.message;
      })

      // Get HR
      .addCase(fetchHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload?.data ?? action.payload;
      })
      .addCase(fetchHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || action.error?.message;
      })

      // Update HR
      .addCase(updateHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload?.data ?? action.payload;
      })
      .addCase(updateHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || action.error?.message;
      })

      // Delete HR
      .addCase(deleteHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = null;
      })
      .addCase(deleteHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || action.error?.message;
      })

      // Get All Posts by HR
      .addCase(getAllPostsByHr.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPostsByHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // set posts from payload.data or payload (fallback)
        state.posts = action.payload?.data ?? action.payload ?? [];
      })
      .addCase(getAllPostsByHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload || action.error?.message;
      })

      // Get All Attendees by HR (new)
      .addCase(getAllAttendeesByHr.pending, (state) => {
        state.attendeesLoading = true;
        state.attendeesError = false;
        state.attendeesMessage = "";
      })
      .addCase(getAllAttendeesByHr.fulfilled, (state, action) => {
        state.attendeesLoading = false;
        state.attendeesError = false;
        // API returns { success, message, data, meta } or maybe { data }
        const payload = action.payload ?? {};
        state.attendees = payload?.data ?? payload?.attendees ?? [];
        state.attendeesMeta = payload?.meta ?? null;
        state.attendeesMessage = payload?.message ?? "";
      })
      .addCase(getAllAttendeesByHr.rejected, (state, action) => {
        state.attendeesLoading = false;
        state.attendeesError = true;
        state.attendeesMessage =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Failed to fetch attendees";
      });
  },
});

export const { resetHrState } = hrSlice.actions;
export default hrSlice.reducer;
