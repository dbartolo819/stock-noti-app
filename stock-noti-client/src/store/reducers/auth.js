import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  errors: [],
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("jwtToken");
      state.isAuthenticated = false;
    },
    loginFail: (state) => {
      localStorage.removeItem("jwtToken");
      state.isAuthenticated = false;
    },
    authError: (state, action) => {
      const { payload } = action;
      console.log("this is payload");
      console.log(payload);
      if (payload.clearErrors) {
        state.errors = []
      }
      else if (payload.errMsg) {
        state.errors.push(payload.errMsg);
      }      
    },
    loading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { login, logout, loginFail, authError, loading } = authSlice.actions;

export default authSlice.reducer;
