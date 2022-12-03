const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");

//prams

router.param("userId", getUserById);
router.param("orderId", getOrderById);
//cerate
router.post(
  "/order/create/:userId",
  isSignIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
//read
router.get(
  "/order/all/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//statuse of order
router.get(
  "/order/status/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
