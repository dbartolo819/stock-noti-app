import {
  getUserStocks,
  addStock,
  removeStock,
  stockError,
} from "../reducers/stock";
import StockApiClient from "../../utils/stockApi";
import StockNotiClient from "../../utils/api";

export const getAllStocksByUser = () => {
  return async (dispatch) => {
    try {
      const res = await StockNotiClient.get("/api/stock");
      dispatch(getUserStocks(res.data));
    } catch (error) {
      console.log("getAllStocksByUser", error);
      const errors = [{ msg: error.response.data.msg }];
      dispatch(stockError({ errors }));
    }
  };
};

export const sendStock = (stockSymbol, targetPrice) => {
  return async (dispatch) => {
    try {
      const stockRes = await StockApiClient.get(
        `/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_STOCK_API_KEY}`
      );

      //Check if stockSymbol exists
      let stockSymbolErrors =
        Object.values(stockRes.data).filter((el) => el).length === 0;

      if (stockSymbolErrors && stockSymbol)
        throw new Error("Stock Symbol Does Not Exist, Try Again.");

      const { c: currPrice } = stockRes.data;
      const stockReq = { currPrice, stockSymbol, targetPrice };
      const res = await StockNotiClient.post("/api/stock/send", stockReq);
      dispatch(addStock(res.data));
    } catch (error) {
      console.log("sendStock", error);
      const errors = error.response
        ? error.response.data.errors
        : [{ msg: error.message }];

      dispatch(stockError({ errors }));
    }
  };
};

export const sendStockAlert = (emailText, postId) => {
  return async (dispatch) => {
    try {
      await StockNotiClient.post("/api/stock/sendAlert", emailText);
      dispatch(deleteStock(postId));
    } catch (error) {
      console.log("sendStockAlert", error);
      const errors = [{ msg: error.response.data.msg }];
      dispatch(stockError({ errors }));
    }
  }
}

export const deleteStock = (postId) => {
  return async (dispatch) => {
    try {
      await StockNotiClient.delete(`/api/stock/delete/${postId}`);
      dispatch(removeStock(postId));
    } catch (error) {
      console.log("deleteStock", error);
      const errors = [{ msg: error.response.data.msg }];
      dispatch(stockError({ errors }));
    }
  };
};
