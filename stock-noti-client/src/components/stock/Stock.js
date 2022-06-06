import React, { useEffect } from "react";

import StockForm from "./StockForm";
import ActiveStocks from "./ActiveStocks";
import InactiveStocks from "./InactiveStocks";
import Divider from "@mui/material/Divider";

import "./Stock.css";

const Stock = () => {

  //need a get to our database that has all the active stocks and set the state here for active stocks and inactive stocks
  useEffect(() => {}, [])


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
