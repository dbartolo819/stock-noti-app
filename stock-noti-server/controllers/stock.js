const { validationResult } = require("express-validator");

const Stock = require("../models/Stock");

const getAllStocksByUser = async (req, res) => {
  try {
    let stocks = await Stock.find({ user: req.user }).exec();
    res.json(stocks);
  } catch (error) {
    console.log("getAllStocksByUser (api) error", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

//Improvement? Call stock api from store/actions/stock sendStock function
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
    console.log("sendStock (api) error", error);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

const deleteStock = async (req, res) => {
  try {
    let stock = await Stock.findByIdAndDelete(req.params.postId);
    res.json(stock)
  } catch (error) {
    console.log("deleteStock (api) error", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  getAllStocksByUser,
  sendStock,
  deleteStock,
};
