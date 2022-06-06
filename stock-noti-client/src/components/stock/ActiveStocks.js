import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ActiveStock from "./ActiveStock";

import "./ActiveStocks.css";

const ActiveStocks = (props) => {
  const data = [
    {
      id: 1,
      ticker: "TWTR",
      tickerLogo:
        "https://1000logos.net/wp-content/uploads/2021/04/Twitter-logo.png",
      tickerTargetPrice: 30.72,
      tickerTargetPercentage: 15,
    },
    {
      id: 2,
      ticker: "AAPL",
      tickerLogo:
        "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
      tickerTargetPrice: 12.04,
      tickerTargetPercentage: 19,
    },
  ];

  //xs = 0px, sm = 600px , m = 900, lg = 1200px, xl = 1536px
  let gridExpandingProp;
  let minWidth;
  switch (data.length) {
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
            {data.map((item) => (
              <Grid key={item.id} item {...gridExpandingProp}>
                <ActiveStock
                  ticker={item.ticker}
                  tickerLogo={item.tickerLogo}
                  tickerTargetPrice={item.tickerTargetPrice}
                  tickerTargetPercentage={item.tickerTargetPercentage}
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
