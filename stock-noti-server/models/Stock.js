const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  currPrice: {
    type: String,
    required: true,
  },
  stockSymbol: {
    type: String,
    required: true,
  },
  targetPrice: {
    type: String,
    required: true,
  },
});

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
