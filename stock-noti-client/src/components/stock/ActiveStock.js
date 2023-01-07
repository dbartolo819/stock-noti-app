import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteStock } from "../../store/actions/stock";

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
            console.log(props.id)
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
          Current Price: {props.currPrice}
        </Typography>
        <Typography className="activeStock__percentageText" variant="subtitle1">
          Target Price: {props.targetPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActiveStock;
