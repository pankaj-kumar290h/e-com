const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { signout, signup, signin, isSignIn } = require("../controllers/auth");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),

  signup
);

router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 3 }),

  signin
);
router.get("/signout", signout);
router.get("/testRoute", isSignIn, (req, res) => {
  res.send("proted route");
});

module.exports = router;
