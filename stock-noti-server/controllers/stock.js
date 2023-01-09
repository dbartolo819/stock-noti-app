const { validationResult } = require("express-validator");

const Stock = require("../models/Stock");
const User = require("../models/User");
const nodemailer = require("nodemailer"); //For Testing Email Sending/Preview

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

const sendStockAlert = async (req, res) => {
  //For Testing Email Sending/Preview
  try {
    let testAccount = await nodemailer.createTestAccount();

    const user = await User.findById(req.user).select("-password");

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"Testing Person" <stock-alert@.com>',
      to: user.email,
      subject: "This is subject test",
      text: "This is text test",
      html: "<b>This is body test</b>",
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json({ msg: "Success!" });
  } catch (error) {
    console.log("sendStockAlert (api) error", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteStock = async (req, res) => {
  try {
    let stock = await Stock.findByIdAndDelete(req.params.postId);
    res.json(stock);
  } catch (error) {
    console.log("deleteStock (api) error", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  getAllStocksByUser,
  sendStock,
  sendStockAlert,
  deleteStock,
};
