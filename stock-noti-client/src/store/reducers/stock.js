import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockSymbol: "",
  percentage: "", //or 0
  duration: "",
  activeStocks: [],
  inactiveStocks: [],
};

const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    handleStockSymbol: (state, action) => {
      state.stockSymbol = action.payload;
    },
    handlePercentage: (state, action) => {
      state.percentage = action.payload;
    },
    handleDuration: (state, action) => {
      state.duration = action.payload;
    },
    
  },
});

export const {
  handleStockSymbol,
  handlePercentage,
  handleDuration,
  stockAdded,
  stockRemoved,
} = stockSlice.actions;

export default stockSlice.reducer;
