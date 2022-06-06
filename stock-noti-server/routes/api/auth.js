const express = require("express");

const { login, registerUser } = require("../../controllers/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/", login);

module.exports = router;
