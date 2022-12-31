import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";

import "./ActiveStock.css";

const ActiveStock = (props) => {
  const [raise, setRaise] = useState(false);

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
        <CancelIcon className="activeStock__cardExitBtn" />
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
          Target Price: {props.targetPrice}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActiveStock;
