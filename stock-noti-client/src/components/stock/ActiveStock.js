import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton } from "@material-ui/core";
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
      {/*also checks how requests goes will it be post to your api to store the active stocks and a get to stock api to get data*/}
      <CardHeader
        avatar={<Avatar src={props.tickerLogo} variant="rounded" />}
        action={
          <IconButton>
            <CancelIcon/>
          </IconButton>
        }
        title={props.ticker}
      />
      <CardContent>
        <Typography
          className="activeStock__priceText"
          gutterBottom
          variant="h5"
          component="div"
        >
          Target Price: {props.tickerTargetPrice}
        </Typography>
        <Typography className="activeStock__percentageText" variant="subtitle1">
          Target Percentage: {props.tickerTargetPercentage}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActiveStock;
