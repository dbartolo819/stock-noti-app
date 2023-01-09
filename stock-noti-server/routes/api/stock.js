const express = require("express");
const { check } = require("express-validator");

const {
  getAllStocksByUser,
  sendStock,
  sendStockAlert,
  deleteStock,
} = require("../../controllers/stock");
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

router.post("/sendAlert", auth, sendStockAlert);

router.delete("/delete/:postId", auth, deleteStock);

module.exports = router;
