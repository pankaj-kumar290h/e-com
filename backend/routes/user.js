const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignIn } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isSignIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId", isSignIn, isAuthenticated, userPurchaseList);

module.exports = router;
