import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hrService from '../services/hrService';

const initialState = {
  hr: null,
  loading: false,
  error: false,
  success: false,
  message: '',
};

// Async Thunks
export const createHrThunk = createAsyncThunk(
  'hr/create',
  async (hrData, thunkAPI) => {
    try {
      return await hrService.createHr(hrData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getHrThunk = createAsyncThunk(
  'hr/get',
  async ({ id, token }, thunkAPI) => {
    try {
      return await hrService.getHr(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateHrThunk = createAsyncThunk(
  'hr/update',
  async ({ id, hrData, token }, thunkAPI) => {
    try {
      return await hrService.updateHr(id, hrData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteHrThunk = createAsyncThunk(
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
      .addCase(createHrThunk.pending, (state) => { state.loading = true; })
      .addCase(createHrThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(createHrThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Get HR
      .addCase(getHrThunk.pending, (state) => { state.loading = true; })
      .addCase(getHrThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(getHrThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update HR
      .addCase(updateHrThunk.pending, (state) => { state.loading = true; })
      .addCase(updateHrThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hr = action.payload;
      })
      .addCase(updateHrThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete HR
      .addCase(deleteHrThunk.pending, (state) => { state.loading = true; })
      .addCase(deleteHrThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.hr = null;
      })
      .addCase(deleteHrThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetHrState } = hrSlice.actions;
export default hrSlice.reducer;
