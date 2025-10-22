import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hrService from '../services/hrService';

const initialState = {
  hr: null,
  loading: false,
  error: false,
  success: false,
  message: '',
};

// Async actions
export const loginHr = createAsyncThunk("user/login", async (data, thunkAPI) => {
  try {
    const res = await hrService.login(data);

    // Save token & user in localStorage
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
  }
});

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
  'hr/create',
  async (hrData, thunkAPI) => {
    try {
      return await hrService.createHr(hrData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getHr = createAsyncThunk(
  'hr/get',
  async ({ id, token }, thunkAPI) => {
    try {
      return await hrService.getHr(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateHr = createAsyncThunk(
  'hr/update',
  async ({ id, hrData, token }, thunkAPI) => {
    try {
      return await hrService.updateHr(id, hrData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteHr = createAsyncThunk(
  'hr/delete',
  async ({ id, token }, thunkAPI) => {
    try {
      return await hrService.deleteHr(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    resetHrState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create HR
      .addCase(createHr.pending, (state) => { state.loading = true; })
      .addCase(createHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(createHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get HR
      .addCase(getHr.pending, (state) => { state.loading = true; })
      .addCase(getHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(getHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update HR
      .addCase(updateHr.pending, (state) => { state.loading = true; })
      .addCase(updateHr.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(updateHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete HR
      .addCase(deleteHr.pending, (state) => { state.loading = true; })
      .addCase(deleteHr.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.hr = null;
      })
      .addCase(deleteHr.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetHrState } = hrSlice.actions;
export default hrSlice.reducer;
