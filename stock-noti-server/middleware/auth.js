const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Required" });
  }

  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("middleware error");
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticateToken;
