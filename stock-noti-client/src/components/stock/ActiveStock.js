import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteStock, sendStockAlert } from "../../store/actions/stock";
import getPrice from "../../utils/stockPrice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";

import "./ActiveStock.css";

const ActiveStock = (props) => {
  const [raise, setRaise] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEvent = (e) => {
    setRaise((prevState) => !prevState);
  };

  const checkPrice = useCallback(async () => {
    let { id, currPrice, stockSymbol, targetPrice } = props;
    const newPrice = await getPrice(stockSymbol);
    if (newPrice >= targetPrice) {
      dispatch(sendStockAlert({ currPrice, stockSymbol, targetPrice }, id));
    }
  }, [dispatch, props]);

  useEffect(() => {
    const interval = setInterval(checkPrice, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dispatch, checkPrice]);

  return (
    <Card
      className="activeStock__card"
      raised={raise ? true : false}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <div className="activeStock__cardHeader">
        <h2>{props.stockSymbol}</h2>
        <CancelIcon
          className="activeStock__cardExitBtn"
          onClick={() => {
            dispatch(deleteStock(props.id));
          }}
        />
      </div>
      <CardContent>
        <Typography
          className="activeStock__priceText"
          gutterBottom
          variant="h5"
          component="div"
        >
          Initial Price: {props.currPrice}
        </Typography>
        <Typography className="activeStock__percentageText" variant="subtitle1">
          Target Price: {props.targetPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActiveStock;
