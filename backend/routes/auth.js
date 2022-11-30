const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { signout, signup } = require("../controllers/auth");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),

  signup
);
router.get("/signout", signout);

module.exports = router;
