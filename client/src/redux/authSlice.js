// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://walmartfullstack-1.onrender.com/api/auth';

// Thunk to handle login
export const login = createAsyncThunk('/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; // Ensure response keys match: accessToken and refreshToken
  } catch (err) {
    return rejectWithValue(err.response.data ? err.response.data : err.message);
  }
});

// Thunk to handle registration
export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data ? err.response.data : err.message);
  }
});

// Thunk to handle token refresh
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
  const { refreshToken } = getState().auth;
  if (!refreshToken) throw new Error('No refresh token available');

  try {
    const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data ? err.response.data : err.message);
  }
});

// Fetch user data using the access token
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (_, { getState, rejectWithValue }) => {
  const { accessToken } = getState().auth;
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data ? err.response.data : err.message);
  }
});

// Thunk for forgot password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, userData);
    return response.data; // Handle success response
  } catch (err) {
    return rejectWithValue(err.response.data ? err.response.data : err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken; // Use accessToken (ensure it's the same from backend)
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.msg : action.error.message;
      })

      // Handle registration
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.msg : action.error.message;
      })

      // Handle token refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload ? action.payload.msg : action.error.message;
      })

      // Handle fetching user data
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload ? action.payload.msg : action.error.message;
      })

      // Handle forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle any success logic if needed
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
