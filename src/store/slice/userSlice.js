import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: null,
    error: null,
    message: null,
    token: localStorage.getItem("token") || null,
    isLoggedOut: false,  
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.message = action.payload.message;
      localStorage.setItem("token", action.payload.token);
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.message = action.payload.message;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      state.isLoggedOut = true;  // Set logout flag
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },
    clearLogoutFlag(state) {
      state.isLoggedOut = false;  // Reset the logout flag
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  logoutSuccess,
  logoutFailed,
  clearLogoutFlag,
  clearAllErrors,
} = userSlice.actions;

export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(registerSuccess(response.data));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(response.data));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(fetchUserRequest());
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/getuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      dispatch(fetchUserSuccess(response.data.data));
      dispatch(clearAllErrors());
    } catch (error) {
      dispatch(fetchUserFailed(error.response.data.message));
    }
  } else {
    dispatch(fetchUserFailed("No token found"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());  // Dispatch logout and set logout flag
  } catch (error) {
    dispatch(logoutFailed("Logout failed"));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(clearAllErrors());
};

export default userSlice.reducer;
