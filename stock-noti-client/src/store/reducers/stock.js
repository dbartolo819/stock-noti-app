import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockSymbol: "",
  targetPrice: "",
  activeStocks: [],
  errors: [],
  // inactiveStocks: [],
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    handleStockSymbol: (state, action) => {
      const { payload } = action;
      state.stockSymbol = payload;
    },
    handleTargetPrice: (state, action) => {
      const { payload } = action;
      state.targetPrice = payload;
    },
    clearForm: (state) => {
      state.stockSymbol = "";
      state.targetPrice = "";
    },
    getUserStocks: (state, action) => {
      const { payload } = action;
      state.activeStocks = payload;
    },
    addStock: (state, action) => {
      const { payload } = action;
      state.activeStocks.push(payload);
    },
    removeStock: (state, action) => {
      const { payload } = action;
      state.activeStocks = state.activeStocks.filter((stock) => {
        return stock._id !== payload;
      });
    },
    stockError: (state, action) => {
      const { payload } = action;
      state.errors = [];
      payload.errors.forEach((element) => {
        state.errors.push(element.msg);
      });
    },
    clearStockErrors: (state) => {
      state.errors = [];
    },
  },
});

export const {
  handleStockSymbol,
  handleTargetPrice,
  clearForm,
  getUserStocks,
  addStock,
  removeStock,
  stockError,
  clearStockErrors,
} = stockSlice.actions;

export default stockSlice.reducer;
