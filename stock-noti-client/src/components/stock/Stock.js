import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllStocksByUser } from "../../store/actions/stock";

import StockForm from "./StockForm";
import ActiveStocks from "./ActiveStocks";
import InactiveStocks from "./InactiveStocks";
import Divider from "@mui/material/Divider";

import "./Stock.css";

const Stock = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStocksByUser());
  }, [dispatch]);

  return (
    <div className="stock">
      <StockForm />
      <Divider className="stock__divider" variant="middle" />
      <ActiveStocks />
      <InactiveStocks />
    </div>
  );
};

export default Stock;
