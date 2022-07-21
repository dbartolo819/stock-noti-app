const express = require("express");
const { check } = require("express-validator");
const passwordValidator = require("password-validator");

const { registerUser, loginUser, loadUser } = require("../../controllers/auth");
const auth = require("../../middleware/auth");
const router = express.Router();
var passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(75)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

router.post(
  "/register",
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").custom((password) => {
    if (passwordSchema.validate(password)) {
      return true;
    } 
    else {
      return Promise.reject(
        passwordSchema.validate(password, { details: true })
      );
    }
  }),
  registerUser
);

router.post(
  "/",
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password").custom((password) => {
    if (passwordSchema.validate(password)) {
      return true;
    } 
    else {
      return Promise.reject(
        passwordSchema.validate(password, { details: true })
      );
    }
  }),
  loginUser
);

router.get("/", auth, loadUser);

module.exports = router;
