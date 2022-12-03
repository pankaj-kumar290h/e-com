const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { Router } = require("express");

///prames
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

///actual routes goes heare
//create route
router.post(
  "/category/create/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//get route

router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put(
  "/category/:categoryId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
//delete
router.delete(
  "/category/:categoryId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
