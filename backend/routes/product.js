const express = require("express");
const router = express.Router();

const { isSignIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategory,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

///all of actual route

/// create route
router.post(
  "/product/create/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//reade route

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

///delet route
router.delete(
  "/product/:productId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

///update route
router.put(
  "/product/:productId/:userId",
  isSignIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

///listing route

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategory);

module.exports = router;
