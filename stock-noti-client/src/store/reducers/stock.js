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
    getUserStocks: (state, action) => {
      const { payload } = action;
      state.activeStocks = payload;
    },
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
    addStock: (state, action) => {
      const { payload } = action;
      state.activeStocks.push(payload);
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
  getUserStocks,
  handleStockSymbol,
  handleTargetPrice,
  clearForm,
  addStock,
  stockError,
  clearStockErrors,
} = stockSlice.actions;

export default stockSlice.reducer;
