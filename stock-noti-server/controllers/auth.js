const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");

const registerUser = async (req, res) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    console.log("this is the user");
    console.log(user);

    if (user) {
      return res.status(400).json({
        errors: {
          msg: "Email Already Exists. Please check email provided.",
        },
      });
    }

    console.log("user that will be new");
    console.log(user);

    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("the hashed password is: ");
    console.log(user.password);
    user.save();

    const payload = {
      user: user.id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } catch (error) {
    console.log("register error");
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    console.log("this is the user for logging in");
    console.log(user);

    if (!user) {
      return res.status(400).json({
        errors: {
          msg: "Invalid Credentials. Please check email provided.",
        },
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({
        errors: {
          msg: "Invalid Credentials. Please check password provided.",
        },
      });
    }

    const payload = {
      user: user.id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } catch (error) {
    console.log("login error");
    console.log(error);
  }
};

const loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    console.log("load User error");
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  loadUser,
};
