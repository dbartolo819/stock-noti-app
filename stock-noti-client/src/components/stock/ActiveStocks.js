import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ActiveStock from "./ActiveStock";

import "./ActiveStocks.css";

const ActiveStocks = (props) => {
  const activeStocks = useSelector((state) => state.stock.activeStocks);

  //xs = 0px, sm = 600px , m = 900, lg = 1200px, xl = 1536px
  let gridExpandingProp;
  let minWidth;
  switch (activeStocks.length) {
    case 1:
      gridExpandingProp = { xs: 12, md: 12, lg: 12, xl: 12 };
      minWidth = true;
      break;
    case 2:
      gridExpandingProp = { xs: 12, md: 6, lg: 6, xl: 6 };
      minWidth = true;
      break;
    case 3:
      gridExpandingProp = { xs: 6, md: 6, lg: 6, xl: 6 };
      minWidth = true;
      break;
    default:
      gridExpandingProp = { xs: 6, md: 6, lg: 3, xl: 3 };
      minWidth = false;
  }

  if (activeStocks.length === 0) {
    return (
      <div>No Stocked Added Yet!</div>
    )
  }

  return (
    <div className="activeStocks">
      <div className="activeStocks__title">Active Stocks</div>
      <div
        className={`activeStocks__body ${
          minWidth ? "activeStocks__bodyWidth" : ""
        }`}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {activeStocks.map((item) => (
              <Grid key={item._id} item {...gridExpandingProp}>
                <ActiveStock
                  id={item._id}
                  currPrice={item.currPrice}
                  stockSymbol={item.stockSymbol}
                  targetPrice={item.targetPrice}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ActiveStocks;
