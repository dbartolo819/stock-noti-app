import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleStockSymbol,
  handlePercentage,
  handleDuration,
} from "../../store/reducers/stock";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./StockForm.css";

const StockForm = (props) => {
  const stockSymbol = useSelector((state) => state.stock.stockSymbol);
  const percentage = useSelector((state) => state.stock.percentage);
  const duration = useSelector((state) => state.stock.duration);

  const dispatch = useDispatch();

  const handleStockSymbolChange = (e) => {
    dispatch(handleStockSymbol(e.target.value));
  };

  const handlePercentageChange = (e) => {
    dispatch(handlePercentage(e.target.value));
  };

  const handleDurationChange = (e) => {
    dispatch(handleDuration(e.target.value));
  };

  const submitForm = (e) => {
    e.preventDefault();

    //make api call here to your own api

    //dispatch here --> in the action you call your own api --> then in your own api you do the stuff

    //then in the endpoint by your api:
    //-do a get request to stock api for the current price
    //And we are going to send a request every duration until
    //it hits the percentage change.
    //Once that happens we send an email to the users email
    //Then that active card for the stock moves to inactive

    //  const movie = {
    //     title: titleRef.current.value,
    //     openingText: openingTextRef.current.value,
    //     releaseDate: releaseDateRef.current.value,
    //   };

    //   const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json', {
    //     method: 'POST',
    //     body: JSON.stringify(movie),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   const data = await response.json();
    //   console.log(data);

    
    console.log(stockSymbol + percentage + duration);
  };

  return (
    <>
      <form className="stockform__form" onSubmit={submitForm}>
        <TextField
          id="outlined-basic"
          placeholder="Stock Symbol"
          variant="outlined"
          value={stockSymbol}
          onChange={handleStockSymbolChange}
        />
        <TextField
          id="outlined-number"
          placeholder="Target Percentage"
          type="number"
          value={percentage ? percentage : ""}
          onChange={handlePercentageChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={duration}
            onChange={handleDurationChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <p style={{ color: "#0000005e" }}>Duration</p>
            </MenuItem>
            <MenuItem value={5}>5 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={60}>1 hour</MenuItem>
            <MenuItem value={1440}>1 day</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </>
  );
};

export default StockForm;
