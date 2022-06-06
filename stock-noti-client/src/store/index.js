import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth";
import stockReducer from "./reducers/stock";

const store = configureStore({
  reducer: { auth: authReducer, stock: stockReducer },
});

export default store;
