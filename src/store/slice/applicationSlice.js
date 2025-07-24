import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    requestForAllApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications;
    },
    resetApplicationSlice(state, action) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
  },
});

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/application/employer/getallAppliction`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.data
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response.data.message
      )
    );
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/application/jobSeeker/getallAppliction`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.data
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplications(
        error.response.data.message
      )
    );
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/application/postApplication/${jobId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
          "Content-Type": "multipart/form-data", // Set content type for multipart form
        },
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/application/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(clearAllApplicationErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
