const { validationResult } = require("express-validator");

const Stock = require("../models/Stock");

const getAllStocksByUser = async (req, res) => {
  try {
    let stocks = await Stock.find({ user: req.user }).exec();
    res.json(stocks);
  } catch (error) {
    console.log("getAllStocksByUser (api) error");
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

//Improvement? Call stock api from addStock function
const sendStock = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currPrice, stockSymbol, targetPrice } = req.body;

  try {
    let newStock = new Stock({
      user: req.user,
      currPrice,
      targetPrice,
      stockSymbol,
    });
    let stock = await newStock.save();
    res.json(stock);
  } catch (error) {
    console.log("addStock (api) errssor");
    console.log(error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

module.exports = {
  getAllStocksByUser,
  sendStock,
};
