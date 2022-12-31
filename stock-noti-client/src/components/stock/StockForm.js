import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleStockSymbol,
  handleTargetPrice,
  clearForm,
  clearStockErrors
} from "../../store/reducers/stock";
import { sendStock } from "../../store/actions/stock";
import { useSnackbar } from "notistack";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./StockForm.css";

const StockForm = (props) => {
  const stockSymbol = useSelector((state) => state.stock.stockSymbol);
  const targetPrice = useSelector((state) => state.stock.targetPrice);
  const errors = useSelector((state) => state.stock.errors);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  //alternative to keeping form state here
  const handleStockSymbolChange = (e) => {
    dispatch(handleStockSymbol(e.target.value));
  };

  const handleTargetPriceChange = (e) => {
    dispatch(handleTargetPrice(e.target.value));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(sendStock(stockSymbol, targetPrice));
    dispatch(clearForm());
  };

  const handleVariant = useCallback(
    (options, variant) => {
      enqueueSnackbar(options.errMessage, { variant });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (errors.length > 0) {
      errors.map((err) => handleVariant({ errMessage: err }, "error"));
      dispatch(clearStockErrors());
    }
  }, [errors, handleVariant]);

  return (
    <>
      <form className="stockform__form" onSubmit={submitForm}>
        <TextField
          placeholder="Stock Symbol"
          variant="outlined"
          value={stockSymbol}
          onChange={handleStockSymbolChange}
        />
        <TextField
          type="number"
          placeholder="Target Price"
          variant="outlined"
          value={targetPrice}
          onChange={handleTargetPriceChange}
        />
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </>
  );
};

export default StockForm;
