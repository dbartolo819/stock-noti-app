import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer