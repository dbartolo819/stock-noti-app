const express = require("express");
const { check } = require("express-validator");

const { getAllStocksByUser, sendStock } = require("../../controllers/stock");
const auth = require("../../middleware/auth");
const router = express.Router();

router.get("/", auth, getAllStocksByUser);

router.post(
  "/send",
  [
    auth,
    check("stockSymbol", "Stock Symbol is Required").not().isEmpty(),
    check("targetPrice", "Target Price is Required").not().isEmpty(),
  ],
  sendStock
);

module.exports = router;
