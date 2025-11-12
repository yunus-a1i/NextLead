// src/store/attendSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDriveAttendee } from '../services/attendService';

// Thunk payload: { userId, interveiwPostId, resumeLink, token? }
export const attendDrive = createAsyncThunk(
  'attend/attendDrive',
  async ({ userId, interveiwPostId, resumeLink, token }, { rejectWithValue }) => {
    try {
      const payload = { userId, interveiwPostId, resumeLink };
      const data = await createDriveAttendee(payload, token);
      return data;
    } catch (err) {
      // Try to return a readable error message
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue({ success: false, message: err.message || 'Network error' });
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  attendee: null, // created DriveAttendies record
  interveiwPostData: null, // updated interveiw post returned from server
};

const attendSlice = createSlice({
  name: 'attend',
  initialState,
  reducers: {
    resetAttendState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.attendee = null;
      state.interveiwPostData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attendDrive.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(attendDrive.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success ?? true;
        state.error = null;
        state.attendee = action.payload?.data ?? null;
        state.interveiwPostData = action.payload?.interveiwPostData ?? null;
      })
      .addCase(attendDrive.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        // action.payload is what we passed from rejectWithValue (if used)
        state.error = action.payload?.message || action.error.message || 'Failed to attend drive';
      });
  },
});

export const { resetAttendState } = attendSlice.actions;

export const selectAttendState = (state) => state.attend || initialState;
export const selectAttendLoading = (state) => selectAttendState(state).loading;
export const selectAttendSuccess = (state) => selectAttendState(state).success;
export const selectAttendError = (state) => selectAttendState(state).error;
export const selectAttendee = (state) => selectAttendState(state).attendee;
export const selectInterveiwPostData = (state) => selectAttendState(state).interveiwPostData;

export default attendSlice.reducer;
